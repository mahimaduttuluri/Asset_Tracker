using Microsoft.EntityFrameworkCore;
using PlatformService.Domain.Entities;

namespace PlatformService.Infrastructure.Data
{
    public class PlatformDbContext : DbContext
    {
        public PlatformDbContext(DbContextOptions<PlatformDbContext> options)
            : base(options)
        {
        }

        // ─────────────────────────────
        // DbSets
        // ─────────────────────────────

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> TenantUsers { get; set; }
        public DbSet<Role> TenantRoles { get; set; }
        public DbSet<UserRoleMapping> TenantUserRoles { get; set; }

        public DbSet<Module> Modules { get; set; }
        public DbSet<Menu> Menus { get; set; }

        public DbSet<TenantModule> TenantModules { get; set; }
        public DbSet<RoleMenu> TenantRoleMenus { get; set; }

        // ─────────────────────────────
        // Model Configuration
        // ─────────────────────────────

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Tenant
            modelBuilder.Entity<Tenant>()
                .HasIndex(t => t.TenantCode)
                .IsUnique();

            // TenantUser
            modelBuilder.Entity<User>()
                .HasIndex(u => new { u.TenantId, u.Email })
                .IsUnique();

            // TenantRole
            modelBuilder.Entity<Role>()
                .HasIndex(r => new { r.TenantId, r.RoleCode })
                .IsUnique();

            // TenantUserRole (Many-to-Many)
            modelBuilder.Entity<UserRoleMapping>()
                .HasIndex(ur => new { ur.TenantUserId, ur.TenantRoleId })
                .IsUnique();

            // Module
            modelBuilder.Entity<Module>()
                .HasIndex(m => m.ModuleCode)
                .IsUnique();

            // TenantModule
            modelBuilder.Entity<TenantModule>()
                .HasIndex(tm => new { tm.TenantId, tm.ModuleId })
                .IsUnique();

            // TenantRoleMenu
            modelBuilder.Entity<RoleMenu>()
                .HasIndex(trm => new { trm.TenantRoleId, trm.MenuId })
                .IsUnique();
        }
    }
}