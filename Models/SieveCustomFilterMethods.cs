using Sieve.Services;
using System;
using System.Linq;

namespace ExitSurveyAdmin.Models
{
    public class SieveCustomFilterMethods : ISieveCustomFilterMethods
    {
        // Override filtering based on createTs. We need to convert the provided
        // date (which will be in Pacific time) to UTC, and filter correctly.
        protected IQueryable<T> FilterByDate<T>(IQueryable<T> source, string op, string[] values)
            where T : ExitSurveyAdmin.Models.BaseEntity
        {
            TimeZoneInfo pacificZone = TimeZoneInfo.FindSystemTimeZoneById("America/Vancouver");

            var dayStartPacific = TimeZoneInfo.ConvertTimeToUtc(
                DateTime.Parse(values[0]),
                pacificZone
            );

            var dayEndPacific = dayStartPacific + new TimeSpan(23, 59, 59);

            if (op.Equals(">="))
            {
                return source.Where(item => item.CreatedTs >= dayStartPacific);
            }
            else // i.e. <=
            {
                return source.Where(item => item.CreatedTs <= dayEndPacific);
            }
        }

        // The method is given the {Operator} & {Value}
        public IQueryable<Employee> BlankEmail(
            IQueryable<Employee> source,
            string op,
            string[] values
        )
        {
            var result = source.Where(e => e.PreferredEmail.Length == 0);

            return result; // Must return modified IQueryable<TEntity>
        }

        public IQueryable<TaskLogEntry> LogDate(
            IQueryable<TaskLogEntry> source,
            string op,
            string[] values
        )
        {
            return FilterByDate(source, op, values);
        }
    }
}
