using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class TaskEnum
    {
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
        {
            Code = CodeReconcileCsv,
            Description = "The task to reconcile the new CSV with the existing database."
        };
        public static readonly TaskEnum ReconcileEmployees = new TaskEnum
        {
            Code = CodeReconcileEmployees,
            Description = "The task to reconcile candidate employees with the existing database."
        };
        public static readonly TaskEnum LoadPsa = new TaskEnum
        {
            Code = CodeLoadPsa,
            Description = "The task to get a response from the PSA API.",
        };
        public static readonly TaskEnum ParsePsa = new TaskEnum
        {
            Code = CodeParsePsa,
            Description = "The task to parse loaded PSA API JSON data.",
            Verb = "parse",
            ObjectNoun = "JSON-encoded employee objects from the PSA API"
        };
        public static readonly TaskEnum ReadCsv = new TaskEnum
        {
            Code = CodeReadCsv,
            Description = "The task to read data from a supplied CSV.",
            Verb = "read",
            ObjectNoun = "rows from the CSV",
        };
        public static readonly TaskEnum LoadFromJson = new TaskEnum
        {
            Code = CodeLoadFromJson,
            Description = "The task to insert POSTed employee JSON data into the database.",
            Verb = "insert and update",
            ObjectNoun = "employees from JSON",
        };
        public static readonly TaskEnum LoadFromCsv = new TaskEnum
        {
            Code = CodeLoadFromCsv,
            Description = "The task to insert POSTed employee CSV data into the database.",
            Verb = "insert",
            ObjectNoun = "employees from CSV",
        };
        public static readonly TaskEnum RefreshStatuses = new TaskEnum
        {
            Code = CodeRefreshStatuses,
            Description = "A manually-triggered refresh of employee statuses.",
            Verb = "refresh",
            ObjectNoun = "employee statuses"
        };
        public static readonly TaskEnum UpdateNotExiting = new TaskEnum
        {
            Code = CodeUpdateNotExiting,
            Description = "The update of status of non-exiting employees.",
            Verb = "update",
            ObjectNoun = "non-exiting employees"
        };
        public static readonly TaskEnum ScheduledTask = new TaskEnum
        {
            Code = CodeScheduledTask,
            Description =
                "The scheduled task that runs daily, pulling from PSA API and updating statuses as required."
        };
        public static readonly TaskEnum EmailAdmins = new TaskEnum
        {
            Code = CodeEmailAdmins,
            Description = "The task to email admins."
        };
        public static readonly TaskEnum RetrieveSurveyStatus = new TaskEnum
        {
            Code = CodeRetrieveSurveyStatus,
            Description = "The task to retrieve the survey completion statuses from CallWeb."
        };

        public static readonly List<TaskEnum> AllValues = new List<TaskEnum>
        {
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
        };

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [NotMapped]
        public string Verb { get; set; }

        [NotMapped]
        public virtual string ObjectNoun { get; set; }

        [JsonIgnore]
        public virtual List<TaskLogEntry> TaskLogEntries { get; set; }
    }
}
