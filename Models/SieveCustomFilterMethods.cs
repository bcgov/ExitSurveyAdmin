using System.Linq;
using Sieve.Services;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class SieveCustomFilterMethods : ISieveCustomFilterMethods
    ***REMOVED***

        // The method is given the ***REMOVED***Operator***REMOVED*** & ***REMOVED***Value***REMOVED***
        public IQueryable<Employee> BlankEmail(
            IQueryable<Employee> source, string op, string[] values)
        ***REMOVED***
            var result = source.Where(e => e.PreferredEmail.Length == 0);

            return result; // Must return modified IQueryable<TEntity>
      ***REMOVED***
  ***REMOVED***
***REMOVED***