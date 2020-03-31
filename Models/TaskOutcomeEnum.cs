using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class TaskOutcomeEnum
    {

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public List<TaskLogEntry> TaskLogEntries { get; set; }
    }
}