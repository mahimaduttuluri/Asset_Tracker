namespace PlatformService.Domain.Entities
{
    public class RoleMenu
    {
        public Guid TenantRoleMenuId { get; set; }

        public Guid TenantId { get; set; }

        public Guid TenantRoleId { get; set; }
        public Role Role { get; set; }

        public Guid MenuId { get; set; }
        public Menu Menu { get; set; }

        public bool CanAccess { get; set; }
    }
}