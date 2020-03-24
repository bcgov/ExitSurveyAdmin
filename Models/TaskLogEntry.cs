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
        public Employee Employee { get; set; }

        [Required]
        public TaskTypeEnum TaskType { get; set; }

        [Required]
        public TaskOutcomeEnum TaskOutcome { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}