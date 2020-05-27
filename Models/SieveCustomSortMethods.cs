using System;
using System.Linq;
using Sieve.Services;

namespace ExitSurveyAdmin.Models
{

    public class SieveCustomSortMethods : ISieveCustomSortMethods
    {
        // TODO: difficult to factor out the e => e.TimelineEntries.Count, but
        // there must be a way...
        public IQueryable<Employee> TimelineEntryCount(
            IQueryable<Employee> source, bool useThenBy, bool desc)
        {
            if (useThenBy)
            {
                var castSource = ((IOrderedQueryable<Employee>)source);
                return desc
                    ? castSource.ThenByDescending(e => e.TimelineEntries.Count)
                    : castSource.ThenBy(e => e.TimelineEntries.Count);
            }
            else
            {
                return desc
                    ? source.OrderByDescending(e => e.TimelineEntries.Count)
                    : source.OrderBy(e => e.TimelineEntries.Count);
            }
        }
    }
}