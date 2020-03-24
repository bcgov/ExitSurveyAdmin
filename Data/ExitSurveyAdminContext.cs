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
