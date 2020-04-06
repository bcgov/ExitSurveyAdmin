using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class TaskOutcomeEnum
    {
        private static readonly string CodeSuccess = "Success";
        private static readonly string CodeWarn = "Warn";
        private static readonly string CodeFail = "Fail";

        public static readonly TaskEnum Success = new TaskEnum
        {
            Code = CodeSuccess,
            Description = "The task was successful, with no warnings."
        };
        public static readonly TaskEnum Warn = new TaskEnum
        {
            Code = CodeWarn,
            Description = "The task was successful, but there were some warning messages."
        };
        public static readonly TaskEnum Fail = new TaskEnum
        {
            Code = CodeFail,
            Description = "The task failed before completing entirely. It may have been partially successful, but must be re-run to ensure a valid outcome."
        };

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<TaskLogEntry> TaskLogEntries { get; set; }
    }
}