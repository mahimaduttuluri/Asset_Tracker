using PlatformService.Domain.Entities.Base;

namespace PlatformService.Domain.Entities
{
    public class Tenant : AuditableEntity
    {
        // ─────────────────────────────
        // Identity
        // ─────────────────────────────
        public int TenantId { get; set; }              // Maps to ClientKey
        public string TenantCode { get; set; }         // ClientCode
        public string TenantName { get; set; }         // ClientName

        // ─────────────────────────────
        // Application Details
        // ─────────────────────────────
        public string ApplicationName { get; set; }
        public string ClientLogo { get; set; }

        // ─────────────────────────────
        // Cycle / Timing (CTR)
        // ─────────────────────────────
        public int? CtrHours { get; set; }              // CTR_HH
        public int? CtrMinutes { get; set; }            // CTR_MIN

        // ─────────────────────────────
        // Database Connection Details
        // ─────────────────────────────
        public string ServerName { get; set; }
        public string DbServerName { get; set; }
        public string DbUserName { get; set; }
        public byte[] DbPassword { get; set; }
        public string DbName { get; set; }
        public string DbConnectionString { get; set; }

        // ─────────────────────────────
        // Relationships
        // ─────────────────────────────
        public ICollection<User> Users { get; set; }
        public ICollection<Role> Roles { get; set; }
        public ICollection<TenantModule> TenantModules { get; set; }
    }
}