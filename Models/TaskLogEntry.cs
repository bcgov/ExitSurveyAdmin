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
        public Employee Employee ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public TaskTypeEnum TaskType ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public TaskOutcomeEnum TaskOutcome ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Comment ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***