using Sieve.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExitSurveyAdmin.Models
{
    public class TaskLogEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string TaskCode { get; set; }
        public virtual TaskEnum Task { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string TaskOutcomeCode { get; set; }
        public virtual TaskOutcomeEnum TaskOutcome { get; set; }

        [Sieve(CanFilter = true, CanSort = true)]
        [Required]
        public string Comment { get; set; }
    }
}