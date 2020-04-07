using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
    public class TaskLogEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string TaskCode { get; set; }
        public virtual TaskEnum Task { get; set; }

        [Required]
        public string TaskOutcomeCode { get; set; }
        public virtual TaskOutcomeEnum TaskOutcome { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}