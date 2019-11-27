using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Models
***REMOVED***
    public class EmployeeContext : DbContext
    ***REMOVED***
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        ***REMOVED***
      ***REMOVED***

        public DbSet<Employee> Employees ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***
