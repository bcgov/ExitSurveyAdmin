using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskEnum
    ***REMOVED***
        private static readonly string CodeReconcileCsv = "ReconcileCSV";
        private static readonly string CodeEmailUsers = "EmailUsers";
        private static readonly string CodeRetrieveSurveyStatus = "RetrieveSurveyStatus";

        public static readonly TaskEnum ReconcileCsv = new TaskEnum
        ***REMOVED***
            Code = CodeReconcileCsv,
            Description = "The task to reconcile the new CSV with the existing database."
      ***REMOVED***;
        public static readonly TaskEnum EmailUsers = new TaskEnum
        ***REMOVED***
            Code = CodeEmailUsers,
            Description = "The task to email employees."
      ***REMOVED***;
        public static readonly TaskEnum RetrieveSurveyStatus = new TaskEnum
        ***REMOVED***
            Code = CodeRetrieveSurveyStatus,
            Description = "The task to retrieve the survey completion statuses from CallWeb."
      ***REMOVED***;

        public static readonly List<TaskEnum> AllValues = new List<TaskEnum>
        ***REMOVED***
            ReconcileCsv,
            EmailUsers,
            RetrieveSurveyStatus
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