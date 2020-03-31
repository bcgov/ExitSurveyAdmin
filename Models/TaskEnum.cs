using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskEnum
    ***REMOVED***

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public List<TaskLogEntry> TaskLogEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***