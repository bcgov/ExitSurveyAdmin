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
        if (context.AdminUsers.Any())
        {
          return;   // DB has been seeded
        }

        context.AdminUsers.AddRange(
            new AdminUser
            {
              Id = "000001",
              EmployeeId = "FHANGLER",
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