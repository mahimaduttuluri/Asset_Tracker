namespace PlatformService.Domain.Entities
{
    public class TenantModule
    {
        public Guid TenantModuleId { get; set; }

        public Guid TenantId { get; set; }
        public Tenant Tenant { get; set; }

        public Guid ModuleId { get; set; }
        public Module Module { get; set; }

        public bool IsEnabled { get; set; }
    }
}