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
                serviceProvider.GetRequiredService<DbContextOptions<ExitSurveyAdminContext>>())
            )
            {
                // If the context contains any AdminUsers already, it has
                // been seeded. Don't re-seed it.
                if (context.AdminUsers.Any())
                {
                    return;   // DB has been seeded
                }

                context.AdminUsers.AddRange(
                    new AdminUser
                    {
                        Id = "000001",
                        EmployeeId = "FHANGLER",
                        Name = "Frank Hangler",
                        Email = "frank@plotandscatter.com"
                    }
                );

                // TODO: Add all the items.
                context.EmployeeStatusEnums.AddRange(
                    new EmployeeStatusEnum
                    {
                        Code = "New",
                        State = "Initial",
                        Description = "Newly added user; no email sent yet."
                    },
                    new EmployeeStatusEnum
                    {
                        Code = "WelcomeEmailSent",
                        State = "InProgress",
                        Description = "First email sent."
                    },
                    new EmployeeStatusEnum
                    {
                        Code = "SurveyComplete",
                        State = "Final",
                        Description = "Survey has been finished."
                    }
                );

                // TODO: Add all the items.
                context.EmployeeActionTypeEnums.AddRange(
                    new EmployeeActionTypeEnum
                    {
                        Code = "CreateFromCSV",
                        Description = "Employee created by the CSV import task."
                    },
                    new EmployeeActionTypeEnum
                    {
                        Code = "UpdateByTask",
                        Description = "Employee field(s) updated by a task."
                    },
                    new EmployeeActionTypeEnum
                    {
                        Code = "StatusChange",
                        Description = "Employee status was changed."
                    }
                );

                context.TaskTypeEnums.AddRange(
                    new TaskTypeEnum
                    {
                        Code = "ReconcileCSV",
                        Description = "Task to reconcile CSV with database."
                    },
                    new TaskTypeEnum
                    {
                        Code = "EmailUsers",
                        Description = "Task to email users."
                    },
                    new TaskTypeEnum
                    {
                        Code = "RetrieveSurveyStatus",
                        Description = "Task to get survey status from Callweb."
                    }
                );

                context.TaskOutcomeEnums.AddRange(
                    new TaskOutcomeEnum
                    {
                        Code = "Success",
                        Description = "The task was successful. No warnings."
                    },
                    new TaskOutcomeEnum
                    {
                        Code = "Warn",
                        Description = "The task was successful, with warnings."
                    },
                    new TaskOutcomeEnum
                    {
                        Code = "Fail",
                        Description = "The task failed."
                    }
                );

                context.SaveChanges();
            }
        }
    }
}