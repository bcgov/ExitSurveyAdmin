using System;
using System.Linq;
using Sieve.Services;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class SieveCustomSortMethods : ISieveCustomSortMethods
    ***REMOVED***
        // TODO: difficult to factor out the e => e.TimelineEntries.Count, but
        // there must be a way...
        public IQueryable<Employee> TimelineEntryCount(
            IQueryable<Employee> source,
            bool useThenBy,
            bool desc
        )
        ***REMOVED***
            if (useThenBy)
            ***REMOVED***
                var castSource = ((IOrderedQueryable<Employee>)source);
                return desc
                    ? castSource.ThenByDescending(e => e.TimelineEntries.Count)
                    : castSource.ThenBy(e => e.TimelineEntries.Count);
          ***REMOVED***
            else
            ***REMOVED***
                return desc
                    ? source.OrderByDescending(e => e.TimelineEntries.Count)
                    : source.OrderBy(e => e.TimelineEntries.Count);
          ***REMOVED***
      ***REMOVED***

        // Manually overriding the ExitCount sort because it's a string, and
        // the Sieve module does string-sort (i.e. puts 10 before 2).
        public IQueryable<Employee> ExitCount(
            IQueryable<Employee> source,
            bool useThenBy,
            bool desc
        )
        ***REMOVED***
            if (useThenBy)
            ***REMOVED***
                var castSource = ((IOrderedQueryable<Employee>)source);
                return desc
                    ? castSource.ThenByDescending(e => Convert.ToInt32(e.ExitCount))
                    : castSource.ThenBy(e => Convert.ToInt32(e.ExitCount));
          ***REMOVED***
            else
            ***REMOVED***
                return desc
                    ? source.OrderByDescending(e => Convert.ToInt32(e.ExitCount))
                    : source.OrderBy(e => Convert.ToInt32(e.ExitCount));
          ***REMOVED***
      ***REMOVED***

        public IQueryable<Employee> RecordCount(
            IQueryable<Employee> source,
            bool useThenBy,
            bool desc
        )
        ***REMOVED***
            if (useThenBy)
            ***REMOVED***
                var castSource = ((IOrderedQueryable<Employee>)source);
                return desc
                    ? castSource.ThenByDescending(e => Convert.ToInt32(e.RecordCount))
                    : castSource.ThenBy(e => Convert.ToInt32(e.RecordCount));
          ***REMOVED***
            else
            ***REMOVED***
                return desc
                    ? source.OrderByDescending(e => Convert.ToInt32(e.RecordCount))
                    : source.OrderBy(e => Convert.ToInt32(e.RecordCount));
          ***REMOVED***
      ***REMOVED***

        public IQueryable<Employee> GovernmentEmployeeId(
            IQueryable<Employee> source,
            bool useThenBy,
            bool desc
        )
        ***REMOVED***
            if (useThenBy)
            ***REMOVED***
                var castSource = ((IOrderedQueryable<Employee>)source);
                return desc
                    ? castSource.ThenByDescending(e => Convert.ToInt32(e.GovernmentEmployeeId))
                    : castSource.ThenBy(e => Convert.ToInt32(e.GovernmentEmployeeId));
          ***REMOVED***
            else
            ***REMOVED***
                return desc
                    ? source.OrderByDescending(e => Convert.ToInt32(e.GovernmentEmployeeId))
                    : source.OrderBy(e => Convert.ToInt32(e.GovernmentEmployeeId));
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
