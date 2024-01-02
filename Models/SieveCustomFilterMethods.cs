using Sieve.Services;
using System;
using System.Linq;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class SieveCustomFilterMethods : ISieveCustomFilterMethods
    ***REMOVED***
        // Override filtering based on createTs. We need to convert the provided
        // date (which will be in Pacific time) to UTC, and filter correctly.
        protected IQueryable<T> FilterByCreateDate<T>(
            IQueryable<T> source,
            string op,
            string[] values
        )
            where T : ExitSurveyAdmin.Models.BaseEntity
        ***REMOVED***
            TimeZoneInfo pacificZone = TimeZoneInfo.FindSystemTimeZoneById("America/Vancouver");

            var dayStartPacific = TimeZoneInfo.ConvertTimeToUtc(
                DateTime.Parse(values[0]),
                pacificZone
            );

            var dayEndPacific = dayStartPacific + new TimeSpan(23, 59, 59);

            if (op.Equals(">="))
            ***REMOVED***
                return source.Where(item => item.CreatedTs >= dayStartPacific);
          ***REMOVED***
            else // i.e. <=
            ***REMOVED***
                return source.Where(item => item.CreatedTs <= dayEndPacific);
          ***REMOVED***
      ***REMOVED***

        // Override filtering based on modifiedTs. We need to convert the provided
        // date (which will be in Pacific time) to UTC, and filter correctly.
        protected IQueryable<T> FilterByModifiedDate<T>(
            IQueryable<T> source,
            string op,
            string[] values
        )
            where T : ExitSurveyAdmin.Models.BaseEntity
        ***REMOVED***
            TimeZoneInfo pacificZone = TimeZoneInfo.FindSystemTimeZoneById("America/Vancouver");

            var dayStartPacific = TimeZoneInfo.ConvertTimeToUtc(
                DateTime.Parse(values[0]),
                pacificZone
            );

            var dayEndPacific = dayStartPacific + new TimeSpan(23, 59, 59);

            if (op.Equals(">="))
            ***REMOVED***
                return source.Where(item => item.ModifiedTs >= dayStartPacific);
          ***REMOVED***
            else // i.e. <=
            ***REMOVED***
                return source.Where(item => item.ModifiedTs <= dayEndPacific);
          ***REMOVED***
      ***REMOVED***

        // The method is given the ***REMOVED***Operator***REMOVED*** & ***REMOVED***Value***REMOVED***
        public IQueryable<Employee> BlankEmail(
            IQueryable<Employee> source,
            string op,
            string[] values
        )
        ***REMOVED***
            var result = source.Where(e => e.PreferredEmail.Length == 0);

            return result; // Must return modified IQueryable<TEntity>
      ***REMOVED***

        public IQueryable<Employee> ImportDate(
            IQueryable<Employee> source,
            string op,
            string[] values
        )
        ***REMOVED***
            return FilterByCreateDate(source, op, values);
      ***REMOVED***

        public IQueryable<TaskLogEntry> LogDate(
            IQueryable<TaskLogEntry> source,
            string op,
            string[] values
        )
        ***REMOVED***
            return FilterByCreateDate(source, op, values);
      ***REMOVED***

        public IQueryable<Employee> LastModifiedDate(
            IQueryable<Employee> source,
            string op,
            string[] values
        )
        ***REMOVED***
            return FilterByModifiedDate(source, op, values);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
