using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace ExitSurveyAdmin.Models
***REMOVED***
  public static class SeedData
  ***REMOVED***
    public static void Initialize(IServiceProvider serviceProvider)
    ***REMOVED***
      using (var context = new ExitSurveyAdminContext(
          serviceProvider.GetRequiredService<
              DbContextOptions<ExitSurveyAdminContext>>()))
      ***REMOVED***
        // Look for any movies.
        if (context.Employees.Any())
        ***REMOVED***
          return;   // DB has been seeded
      ***REMOVED***

        context.Employees.AddRange(
            new Employee
            ***REMOVED***
              Id = "000001",
              BirthDate = DateTime.Parse("1980-3-1"),
              FirstName = "John",
              LastName = "Doe",
          ***REMOVED***
        );
        context.SaveChanges();
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***