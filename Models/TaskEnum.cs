using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class TaskEnum
    ***REMOVED***
        private static readonly string CodeReconcileEmployees = "ReconcileEmployees";
        private static readonly string CodeLoadPsa = "LoadPsa";
        private static readonly string CodeParsePsa = "ParsePsa";
        private static readonly string CodeReadCsv = "ReadCSV";
        private static readonly string CodeReconcileCsv = "ReconcileCSV";
        private static readonly string CodeLoadFromJson = "LoadFromJson";
        private static readonly string CodeLoadFromCsv = "LoadFromCSV";
        private static readonly string CodeRefreshStatuses = "RefreshStatuses";
        private static readonly string CodeRetrieveSurveyStatus = "RetrieveSurveyStatus";
        private static readonly string CodeScheduledTask = "ScheduledTask";
        private static readonly string CodeEmailAdmins = "EmailAdmins";
        private static readonly string CodeUpdateNotExiting = "UpdateNotExiting";

        public static readonly TaskEnum ReconcileCsv = new TaskEnum
        ***REMOVED***
            Code = CodeReconcileCsv,
            Description = "The task to reconcile the new CSV with the existing database."
      ***REMOVED***;
        public static readonly TaskEnum ReconcileEmployees = new TaskEnum
        ***REMOVED***
            Code = CodeReconcileEmployees,
            Description = "The task to reconcile candidate employees with the existing database."
      ***REMOVED***;
        public static readonly TaskEnum LoadPsa = new TaskEnum
        ***REMOVED***
            Code = CodeLoadPsa,
            Description = "The task to get a response from the PSA API.",
      ***REMOVED***;
        public static readonly TaskEnum ParsePsa = new TaskEnum
        ***REMOVED***
            Code = CodeParsePsa,
            Description = "The task to parse loaded PSA API JSON data.",
            Verb = "parse",
            ObjectNoun = "JSON-encoded employee objects from the PSA API"
      ***REMOVED***;
        public static readonly TaskEnum ReadCsv = new TaskEnum
        ***REMOVED***
            Code = CodeReadCsv,
            Description = "The task to read data from a supplied CSV.",
            Verb = "read",
            ObjectNoun = "rows from the CSV",
      ***REMOVED***;
        public static readonly TaskEnum LoadFromJson = new TaskEnum
        ***REMOVED***
            Code = CodeLoadFromJson,
            Description = "The task to insert POSTed employee JSON data into the database.",
            Verb = "insert and update",
            ObjectNoun = "employees from JSON",
      ***REMOVED***;
        public static readonly TaskEnum LoadFromCsv = new TaskEnum
        ***REMOVED***
            Code = CodeLoadFromCsv,
            Description = "The task to insert POSTed employee CSV data into the database.",
            Verb = "insert",
            ObjectNoun = "employees from CSV",
      ***REMOVED***;
        public static readonly TaskEnum RefreshStatuses = new TaskEnum
        ***REMOVED***
            Code = CodeRefreshStatuses,
            Description = "A manually-triggered refresh of employee statuses.",
            Verb = "refresh",
            ObjectNoun = "employee statuses"
      ***REMOVED***;
        public static readonly TaskEnum UpdateNotExiting = new TaskEnum
        ***REMOVED***
            Code = CodeUpdateNotExiting,
            Description = "The update of status of non-exiting employees.",
            Verb = "update",
            ObjectNoun = "non-exiting employees"
      ***REMOVED***;
        public static readonly TaskEnum ScheduledTask = new TaskEnum
        ***REMOVED***
            Code = CodeScheduledTask,
            Description =
                "The scheduled task that runs daily, pulling from PSA API and updating statuses as required."
      ***REMOVED***;
        public static readonly TaskEnum EmailAdmins = new TaskEnum
        ***REMOVED***
            Code = CodeEmailAdmins,
            Description = "The task to email admins."
      ***REMOVED***;
        public static readonly TaskEnum RetrieveSurveyStatus = new TaskEnum
        ***REMOVED***
            Code = CodeRetrieveSurveyStatus,
            Description = "The task to retrieve the survey completion statuses from CallWeb."
      ***REMOVED***;

        public static readonly List<TaskEnum> AllValues = new List<TaskEnum>
        ***REMOVED***
            ReconcileCsv,
            ReconcileEmployees,
            LoadPsa,
            ParsePsa,
            ReadCsv,
            LoadFromJson,
            LoadFromCsv,
            RefreshStatuses,
            RetrieveSurveyStatus,
            ScheduledTask,
            EmailAdmins,
      ***REMOVED***;

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        [NotMapped]
        public string Verb ***REMOVED*** get; set; ***REMOVED***

        [NotMapped]
        public virtual string ObjectNoun ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual List<TaskLogEntry> TaskLogEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***
