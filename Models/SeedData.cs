using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace ExitSurveyAdmin.Models
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      using (var context = new ExitSurveyAdminContext(
          serviceProvider.GetRequiredService<
              DbContextOptions<ExitSurveyAdminContext>>()))
      {
        // Look for any movies.
        if (context.Employees.Any())
        {
          return;   // DB has been seeded
        }

        context.Employees.AddRange(
            new Employee
            {
              Id = "123456",
              BirthDate = DateTime.Parse("1980-3-1"),
              FirstName = "John",
              LastName = "Doe",
            }
        );

        context.AdminUsers.AddRange(
            new AdminUser
            {
              Id = "000001",
              FirstName = "Frank",
              LastName = "Hangler",
              Email = "frank@plotandscatter.com"
            }
        );

        context.SaveChanges();
      }
    }
  }
}