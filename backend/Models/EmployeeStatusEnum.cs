using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeStatusEnum
    {
        private static readonly string CodeExiting = "Exiting";
        private static readonly string CodeSurveyComplete = "SurveyComplete";
        private static readonly string CodeSnailMailSent = "SnailMailSent";
        private static readonly string CodeNotExiting = "NotExiting";
        private static readonly string CodeOutOfScope = "OutOfScope";
        private static readonly string CodeDeclined = "Declined";
        private static readonly string CodeExpired = "Expired";

        public static readonly string StateActive = "Active";
        public static readonly string StateFinal = "Final";

        public static readonly EmployeeStatusEnum Exiting = new EmployeeStatusEnum
        {
            Code = CodeExiting,
            State = StateActive,
            Description = "Employee is exiting.."
        };
        public static readonly EmployeeStatusEnum SurveyComplete = new EmployeeStatusEnum
        {
            Code = CodeSurveyComplete,
            State = StateFinal,
            Description = "Survey has been finished."
        };
        public static readonly EmployeeStatusEnum SnailMailSent = new EmployeeStatusEnum
        {
            Code = CodeSnailMailSent,
            State = StateActive,
            Description = "Snail mail has been sent."
        };
        public static readonly EmployeeStatusEnum NotExiting = new EmployeeStatusEnum
        {
            Code = CodeNotExiting,
            State = StateFinal,
            Description = "This employee is not actually exiting."
        };
        public static readonly EmployeeStatusEnum OutOfScope = new EmployeeStatusEnum
        {
            Code = CodeOutOfScope,
            State = StateFinal,
            Description = "Other ineligibility reason."
        };
        public static readonly EmployeeStatusEnum Declined = new EmployeeStatusEnum
        {
            Code = CodeDeclined,
            State = StateActive,
            Description = "The employee has asked not to complete the survey."
        };

        public static readonly EmployeeStatusEnum Expired = new EmployeeStatusEnum
        {
            Code = CodeExpired,
            State = StateFinal,
            Description = "The employee's effective date has passed without completing the survey."
        };

        public static readonly List<EmployeeStatusEnum> AllValues = new List<EmployeeStatusEnum>
        {
            Exiting,
            SurveyComplete,
            SnailMailSent,
            NotExiting,
            OutOfScope,
            Declined,
            Expired
        };

        public static Boolean IsActiveStatus(string statusCode)
        {
            var status = AllValues.Find(s => s.Code == statusCode);
            return status.State == StateActive;
        }


        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<Employee> Employees { get; set; }

        [JsonIgnore]
        public virtual List<EmployeeTimelineEntry> TimelineEntries { get; set; }
    }
}