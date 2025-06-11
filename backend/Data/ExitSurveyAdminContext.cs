using ExitSurveyAdmin.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Models
{
    public class ExitSurveyAdminContext : DbContext
    {
        private EmployeeInfoLookupService EmployeeInfoLookup;

        public ExitSurveyAdminContext(
            DbContextOptions<ExitSurveyAdminContext> options,
            EmployeeInfoLookupService employeeInfoLookup
        ) : base(options)
        {
            EmployeeInfoLookup = employeeInfoLookup;
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeStatusEnum> EmployeeStatusEnums { get; set; }
        public DbSet<EmployeeActionEnum> EmployeeActionEnums { get; set; }
        public DbSet<EmployeeTimelineEntry> EmployeeTimelineEntries { get; set; }
        public DbSet<TaskLogEntry> TaskLogEntries { get; set; }
        public DbSet<TaskEnum> TaskEnums { get; set; }
        public DbSet<TaskOutcomeEnum> TaskOutcomeEnums { get; set; }
        public DbSet<AdminSetting> AdminSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Do not permit cascade deletes should either the Employee or the
            // EmployeeStatusEnum be deleted.
            modelBuilder.Entity<Employee>()
                .HasIndex(e => new { e.GovernmentEmployeeId, e.ExitCount });

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.CurrentEmployeeStatus)
                .WithMany(s => s.Employees)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.Employee)
                .WithMany(employee => employee.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.EmployeeAction)
                .WithMany(action => action.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.EmployeeStatus)
                .WithMany(status => status.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskLogEntry>()
                .HasOne(taskLogEntry => taskLogEntry.Task)
                .WithMany(task => task.TaskLogEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskLogEntry>()
                .HasOne(taskLogEntry => taskLogEntry.TaskOutcome)
                .WithMany(taskOutcome => taskOutcome.TaskLogEntries)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public override int SaveChanges()
        {
            // Add timestamps whenever an entity is saved.
            AddTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default(CancellationToken)
        )
        {
            AddTimestamps();
            return base.SaveChangesAsync(true, cancellationToken);
        }

        // Automatically add timestamps to created / modified entities.Based on code from
        // https://www.koskila.net/how-to-add-creator-modified-info-to-all-of-your-ef-models-at-once-in-net-core/
        private void AddTimestamps()
        {
            // Get all entities that extend BaseEntity and that have been either
            // added or modified.
            var entities = ChangeTracker.Entries().Where(
              x => x.Entity is BaseEntity &&
              (x.State == EntityState.Added || x.State == EntityState.Modified)
            );

            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    // If the entity has been added, update the created timestamp
                    ((BaseEntity)entity.Entity).CreatedTs = DateTime.UtcNow;
                }

              // In all cases, update the modified timestamp
              ((BaseEntity)entity.Entity).ModifiedTs = DateTime.UtcNow;
            }
        }
    }
}
