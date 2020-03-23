using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ExitSurveyAdmin.Models
{
  public class ExitSurveyAdminContext : DbContext
  {
    public ExitSurveyAdminContext(DbContextOptions<ExitSurveyAdminContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }

    public override int SaveChanges()
    {
      // Add timestamps whenever an entity is saved.
      AddTimestamps();
      return base.SaveChanges();
    }

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
