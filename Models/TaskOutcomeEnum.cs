using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskOutcomeEnum
    ***REMOVED***
        private static readonly string CodeSuccess = "Success";
        private static readonly string CodeWarn = "Warn";
        private static readonly string CodeFail = "Fail";

        public static readonly TaskEnum Success = new TaskEnum
        ***REMOVED***
            Code = CodeSuccess,
            Description = "The task was successful, with no warnings."
      ***REMOVED***;
        public static readonly TaskEnum Warn = new TaskEnum
        ***REMOVED***
            Code = CodeWarn,
            Description = "The task was successful, but there were some warning messages."
      ***REMOVED***;
        public static readonly TaskEnum Fail = new TaskEnum
        ***REMOVED***
            Code = CodeFail,
            Description = "The task failed before completing entirely. It may have been partially successful, but must be re-run to ensure a valid outcome."
      ***REMOVED***;

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual List<TaskLogEntry> TaskLogEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***