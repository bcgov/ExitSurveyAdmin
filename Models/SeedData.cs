using ExitSurveyAdmin.Services;
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
                serviceProvider.GetRequiredService<DbContextOptions<ExitSurveyAdminContext>>(),
                serviceProvider.GetRequiredService<EmployeeInfoLookupService>())
            )
            {
                // If the context contains any EmployeeStatuses already, it has
                // been seeded. Don't re-seed it.
                if (context.EmployeeStatusEnums.Any())
                {
                    return;   // DB has been seeded
                }

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

                context.AdminSettings.Add(
                    new AdminSetting()
                    {
                        Key = AdminSetting.EmployeeNotExitingThreshold,
                        DisplayName = "Employee not exiting threshold (days)",
                        Value = "180"
                    }
                );

                context.SaveChanges();
            }
        }
    }
}