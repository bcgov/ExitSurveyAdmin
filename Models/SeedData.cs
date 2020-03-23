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
        if (context.AdminUsers.Any())
        ***REMOVED***
          return;   // DB has been seeded
      ***REMOVED***

        context.AdminUsers.AddRange(
            new AdminUser
            ***REMOVED***
              Id = "000001",
              EmployeeId = "FHANGLER",
              FirstName = "Frank",
              LastName = "Hangler",
              Email = "frank@plotandscatter.com"
          ***REMOVED***
        );

        context.SaveChanges();
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***