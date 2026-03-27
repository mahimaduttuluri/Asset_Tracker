namespace PlatformService.Domain.Entities
{
    public class UserRoleMapping
    {
        public Guid TenantUserRoleId { get; set; }

        public Guid TenantUserId { get; set; }
        public User TenantUser { get; set; }

        public Guid TenantRoleId { get; set; }
        public Role TenantRole { get; set; }
    }
}