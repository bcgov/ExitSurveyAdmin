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
                    DbContextOptions<ExitSurveyAdminContext>
                >())
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

                context.SaveChanges();
            }
        }
    }
}