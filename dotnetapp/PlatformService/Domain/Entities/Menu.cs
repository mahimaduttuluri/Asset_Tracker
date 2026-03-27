using PlatformService.Domain.Entities.Base;

namespace PlatformService.Domain.Entities
{
    public class Menu : AuditableEntity
    {
        public Guid MenuId { get; set; }

        public string MenuName { get; set; }
        public string RoutePath { get; set; }

        public Guid ModuleId { get; set; }
        public Module Module { get; set; }

        public Guid? ParentMenuId { get; set; }
        public Menu ParentMenu { get; set; }
    }
}