using PlatformService.Domain.Entities.Base;

namespace PlatformService.Domain.Entities
{
    public class Module : AuditableEntity
    {
        public Guid ModuleId { get; set; }

        public string ModuleCode { get; set; }
        public string ModuleName { get; set; }

        public ICollection<Menu> Menus { get; set; }
        public ICollection<TenantModule> TenantModules { get; set; }
    }
}