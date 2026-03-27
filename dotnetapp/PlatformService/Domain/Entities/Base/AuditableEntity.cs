namespace PlatformService.Domain.Entities.Base
{
    public abstract class AuditableEntity
    {
        public bool IsActive { get; set; } = true;

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedOn { get; set; }
    }
}