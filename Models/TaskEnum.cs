using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class TaskEnum
    {
        private static readonly string CodeReconcileCSV = "ReconcileCSV";
        private static readonly string CodeEmailUsers = "EmailUsers";
        private static readonly string CodeRetrieveSurveyStatus = "RetrieveSurveyStatus";

        public static readonly TaskEnum ReconcileCSV = new TaskEnum
        {
            Code = CodeReconcileCSV,
            Description = "The task to reconcile the new CSV with the existing database."
        };
        public static readonly TaskEnum EmailUsers = new TaskEnum
        {
            Code = CodeEmailUsers,
            Description = "The task to email employees."
        };
        public static readonly TaskEnum RetrieveSurveyStatus = new TaskEnum
        {
            Code = CodeRetrieveSurveyStatus,
            Description = "The task to retrieve the survey completion statuses from CallWeb."
        };

        public static readonly List<TaskEnum> AllValues = new List<TaskEnum>
        {
            ReconcileCSV,
            EmailUsers,
            RetrieveSurveyStatus
        };

        public override bool Equals(object obj)
        {
            if (obj is string)
            {
                return Code == (string)obj;
            }
            else if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }
            else
            {
                return ((TaskEnum)obj).Code == Code;
            }
        }

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<TaskLogEntry> TaskLogEntries { get; set; }
    }
}