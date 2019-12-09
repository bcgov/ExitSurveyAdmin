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
              Id = "000001",
              BirthDate = DateTime.Parse("1980-3-1"),
              FirstName = "John",
              LastName = "Doe",
            }
        );
        context.SaveChanges();
      }
    }
  }
}