using PlatformService.Domain.Entities.Base;

namespace PlatformService.Domain.Entities
{
    public class Role : AuditableEntity
    {
        public int RoleId { get; set; }

        // Tenant scope
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }

        // Role details
        public string RoleCode { get; set; }
        public string RoleName { get; set; }

        // Navigation
        public ICollection<UserRoleMapping> UserRoles { get; set; }
        public ICollection<RoleMenu> RoleMenus { get; set; }
    }
}