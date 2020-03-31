using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
    public class TaskEnum
    {

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        public List<TaskLogEntry> TaskLogEntries { get; set; }
    }
}