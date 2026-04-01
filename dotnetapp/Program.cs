using Microsoft.EntityFrameworkCore;
using PlatformService.Infrastructure.Persistence.Contexts;
using PlatformService.Infrastructure.Services;
using PlatformService.Infrastructure.Tenancy;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Tenant context per request
builder.Services.AddScoped<ITenantContext, TenantContext>();

// Master (catalog) DbContext
builder.Services.AddDbContext<TenantDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("MasterDb")));

// Tenant database creation service
builder.Services.AddScoped<ITenantDatabaseProvisioner, TenantDatabaseProvisioner>();

// Tenant App DbContext (dynamic per request)
// EF Core database-per-tenant is done by providing the correct connection string. [1](https://github.com/MicrosoftDocs/sql-docs/blob/live/azure-sql/database/saas-tenancy-app-design-patterns.md)
builder.Services.AddDbContext<TenantAppDbContext>((sp, options) =>
{
    var tenantCtx = sp.GetRequiredService<ITenantContext>();
    if (string.IsNullOrWhiteSpace(tenantCtx.ConnectionString))
        throw new InvalidOperationException("Tenant not resolved. Ensure TenantResolutionMiddleware runs before controllers.");

    options.UseNpgsql(tenantCtx.ConnectionString);
});

var app = builder.Build();
var masterCs = builder.Configuration.GetConnectionString("MasterDb");

if (string.IsNullOrWhiteSpace(masterCs))
    throw new InvalidOperationException("MasterDb connection string is missing. Check appsettings.json -> ConnectionStrings:MasterDb");

// optional debug print (remove later)
Console.WriteLine($"[DEBUG] MasterDb CS = {masterCs}");

using (var scope = app.Services.CreateScope())
{
    var masterDb = scope.ServiceProvider.GetRequiredService<TenantDbContext>();

    // ✅ This creates the database (if missing)
    // ✅ Creates __EFMigrationsHistory
    // ✅ Creates D_Client table
    masterDb.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

// MUST run before controllers that use TenantAppDbContext
app.UseMiddleware<TenantResolutionMiddleware>();

app.MapControllers();
app.Run();