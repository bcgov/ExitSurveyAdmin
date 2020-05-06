using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sieve.Attributes;

namespace ExitSurveyAdmin.Models
{
    public class BaseEntity
    {
        public DateTime CreatedTs { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime ModifiedTs { get; set; }
    }
}