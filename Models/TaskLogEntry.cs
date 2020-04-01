using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskLogEntry : BaseEntity
    ***REMOVED***
        [Key]
        [Required]
        public string Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string TaskCode ***REMOVED*** get; set; ***REMOVED***
        public virtual TaskEnum Task ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string TaskOutcomeCode ***REMOVED*** get; set; ***REMOVED***
        public virtual TaskOutcomeEnum TaskOutcome ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Comment ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***