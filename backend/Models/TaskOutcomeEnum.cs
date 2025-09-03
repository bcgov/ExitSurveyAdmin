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

        public static readonly TaskOutcomeEnum Success = new TaskOutcomeEnum
        {
            Code = CodeSuccess,
            Description = "The task was successful, with no warnings."
        };
        public static readonly TaskOutcomeEnum Warn = new TaskOutcomeEnum
        {
            Code = CodeWarn,
            Description = "The task was successful, but there were some warning messages."
        };
        public static readonly TaskOutcomeEnum Fail = new TaskOutcomeEnum
        {
            Code = CodeFail,
            Description = "The task failed before completing entirely. It may have been partially successful, but must be re-run to ensure a valid outcome."
        };

        public static readonly List<TaskOutcomeEnum> AllValues = new List<TaskOutcomeEnum>
        {
            Success,
            Warn,
            Fail
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