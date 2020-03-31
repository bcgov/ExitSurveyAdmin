using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
    public class TaskLogEntry : BaseEntity
    {
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public TaskEnum Task { get; set; }

        [Required]
        public TaskOutcomeEnum TaskOutcome { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}