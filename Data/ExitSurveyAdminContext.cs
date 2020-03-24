using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class ExitSurveyAdminContext : DbContext
    ***REMOVED***
        public ExitSurveyAdminContext(DbContextOptions<ExitSurveyAdminContext> options)
            : base(options)
        ***REMOVED***
      ***REMOVED***

        public DbSet<Employee> Employees ***REMOVED*** get; set; ***REMOVED***
        public DbSet<AdminUser> AdminUsers ***REMOVED*** get; set; ***REMOVED***
        public DbSet<EmployeeStatusEnum> EmployeeStatusEnums ***REMOVED*** get; set; ***REMOVED***
        public DbSet<EmployeeActionTypeEnum> EmployeeActionTypeEnums ***REMOVED*** get; set; ***REMOVED***
        public DbSet<EmployeeTimelineEntry> EmployeeTimelineEntries ***REMOVED*** get; set; ***REMOVED***
        public DbSet<TaskLogEntry> TaskLogEntries ***REMOVED*** get; set; ***REMOVED***
        public DbSet<TaskTypeEnum> TaskTypeEnums ***REMOVED*** get; set; ***REMOVED***
        public DbSet<TaskOutcomeEnum> TaskOutcomeEnums ***REMOVED*** get; set; ***REMOVED***

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        ***REMOVED***
            // Do not permit cascade deletes should either the Employee or the
            // EmployeeStatusEnum be deleted.
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.CurrentEmployeeStatus)
                .WithMany(s => s.Employees)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.Employee)
                .WithMany(employee => employee.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.EmployeeActionType)
                .WithMany(actionType => actionType.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EmployeeTimelineEntry>()
                .HasOne(timelineEntry => timelineEntry.EmployeeStatus)
                .WithMany(status => status.TimelineEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskLogEntry>()
                .HasOne(taskLogEntry => taskLogEntry.TaskType)
                .WithMany(taskType => taskType.TaskLogEntries)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskLogEntry>()
                .HasOne(taskLogEntry => taskLogEntry.TaskOutcome)
                .WithMany(taskOutcome => taskOutcome.TaskLogEntries)
                .OnDelete(DeleteBehavior.Restrict);
      ***REMOVED***

        public override int SaveChanges()
        ***REMOVED***
            // Add timestamps whenever an entity is saved.
            AddTimestamps();
            return base.SaveChanges();
      ***REMOVED***

        // Automatically add timestamps to created / modified entities.Based on code from
        // https://www.koskila.net/how-to-add-creator-modified-info-to-all-of-your-ef-models-at-once-in-net-core/
        private void AddTimestamps()
        ***REMOVED***
            // Get all entities that extend BaseEntity and that have been either
            // added or modified.
            var entities = ChangeTracker.Entries().Where(
              x => x.Entity is BaseEntity &&
              (x.State == EntityState.Added || x.State == EntityState.Modified)
            );

            foreach (var entity in entities)
            ***REMOVED***
                if (entity.State == EntityState.Added)
                ***REMOVED***
                    // If the entity has been added, update the created timestamp
                    ((BaseEntity)entity.Entity).CreatedTs = DateTime.UtcNow;
              ***REMOVED***

              // In all cases, update the modified timestamp
              ((BaseEntity)entity.Entity).ModifiedTs = DateTime.UtcNow;
          ***REMOVED***
      ***REMOVED***

  ***REMOVED***
***REMOVED***
