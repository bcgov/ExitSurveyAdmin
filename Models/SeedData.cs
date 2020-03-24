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

                // TODO: Add all the items.
                context.EmployeeStatusEnums.AddRange(
                    new EmployeeStatusEnum
                    ***REMOVED***
                        Code = "New",
                        State = "Initial",
                        Description = "Newly added user; no email sent yet."
                  ***REMOVED***
                    new EmployeeStatusEnum
                    ***REMOVED***
                        Code = "WelcomeEmailSent",
                        State = "InProgress",
                        Description = "First email sent."
                  ***REMOVED***
                    new EmployeeStatusEnum
                    ***REMOVED***
                        Code = "SurveyComplete",
                        State = "Final",
                        Description = "Survey has been finished."
                  ***REMOVED***
                );

                // TODO: Add all the items.
                context.EmployeeActionTypeEnums.AddRange(
                    new EmployeeActionTypeEnum
                    ***REMOVED***
                        Code = "CreateFromCSV",
                        Description = "Employee created by the CSV import task."
                  ***REMOVED***
                    new EmployeeActionTypeEnum
                    ***REMOVED***
                        Code = "UpdateByTask",
                        Description = "Employee field(s) updated by a task."
                  ***REMOVED***
                    new EmployeeActionTypeEnum
                    ***REMOVED***
                        Code = "StatusChange",
                        Description = "Employee status was changed."
                  ***REMOVED***
                );

                context.SaveChanges();
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***