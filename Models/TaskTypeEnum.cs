using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskTypeEnum
    ***REMOVED***

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        public List<TaskLogEntry> TaskLogEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***