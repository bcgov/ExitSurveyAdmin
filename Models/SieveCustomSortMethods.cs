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
            IQueryable<Employee> source, bool useThenBy, bool desc)
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
  ***REMOVED***
***REMOVED***