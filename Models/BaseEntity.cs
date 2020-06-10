using System;
using Sieve.Attributes;

namespace ExitSurveyAdmin.Models
{
    public class BaseEntity
    {
        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime CreatedTs { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime ModifiedTs { get; set; }
    }
}