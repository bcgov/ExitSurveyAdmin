using Microsoft.EntityFrameworkCore;

namespace ExitSurveyAdmin.Models
{
    public class ExitSurveyAdminContext : DbContext
    {
        public ExitSurveyAdminContext(DbContextOptions<ExitSurveyAdminContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
