using System.Linq;
using Sieve.Services;

namespace ExitSurveyAdmin.Models
{
    public class SieveCustomFilterMethods : ISieveCustomFilterMethods
    {

        // The method is given the {Operator} & {Value}
        public IQueryable<Employee> BlankEmail(
            IQueryable<Employee> source, string op, string[] values)
        {
            var result = source.Where(e => e.PreferredEmail.Length == 0);

            return result; // Must return modified IQueryable<TEntity>
        }
    }
}