using Microsoft.EntityFrameworkCore;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class ExitSurveyAdminContext : DbContext
    ***REMOVED***
        public ExitSurveyAdminContext(DbContextOptions<ExitSurveyAdminContext> options)
            : base(options)
        ***REMOVED***
      ***REMOVED***

        public DbSet<Employee> Employees ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***
