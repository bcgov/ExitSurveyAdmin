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
                serviceProvider.GetRequiredService<DbContextOptions<ExitSurveyAdminContext>>())
            )
            ***REMOVED***
                // If the context contains any AdminUsers already, it has
                // been seeded. Don't re-seed it.
                if (context.AdminUsers.Any())
                ***REMOVED***
                    return;   // DB has been seeded
              ***REMOVED***

                context.AdminUsers.AddRange(
                    new AdminUser
                    ***REMOVED***
                        Id = "000001",
                        EmployeeId = "FHANGLER",
                        Name = "Frank Hangler",
                        Email = "frank@plotandscatter.com"
                  ***REMOVED***
                );

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