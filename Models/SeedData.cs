using ExitSurveyAdmin.Services;
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
                serviceProvider.GetRequiredService<DbContextOptions<ExitSurveyAdminContext>>(),
                serviceProvider.GetRequiredService<EmployeeInfoLookupService>())
            )
            ***REMOVED***
                // If the context contains any EmployeeStatuses already, it has
                // been seeded. Don't re-seed it.
                if (context.EmployeeStatusEnums.Any())
                ***REMOVED***
                    return;   // DB has been seeded
              ***REMOVED***

                context.EmployeeStatusEnums.AddRange(
                    EmployeeStatusEnum.AllValues
                );

                context.EmployeeActionEnums.AddRange(
                    EmployeeActionEnum.AllValues
                );

                context.TaskEnums.AddRange(
                    TaskEnum.AllValues
                );

                context.TaskOutcomeEnums.AddRange(
                    TaskOutcomeEnum.AllValues
                );

                context.SaveChanges();
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***