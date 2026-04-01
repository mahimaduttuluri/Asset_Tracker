using PlatformService.Domain.Entities.Base;

namespace PlatformService.Domain.Entities
{
    public class User : AuditableEntity
    {
        public int UserId { get; set; }

        // Tenant scope
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }

        // User details
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        // Navigation
        public ICollection<UserRoleMapping> UserRoles { get; set; }
    }
}