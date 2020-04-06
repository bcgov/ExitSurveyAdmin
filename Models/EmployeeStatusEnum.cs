using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeStatusEnum
    {
        private static readonly string CodeNew = "New";
        private static readonly string CodeWelcomeEmailSent = "WelcomeEmailSent";
        private static readonly string CodeReminder1Sent = "Reminder1Sent";
        private static readonly string CodeReminder2Sent = "Reminder2Sent";
        private static readonly string CodeSurveyComplete = "SurveyComplete";
        private static readonly string CodeSnailMailSent = "SnailMailSent";
        private static readonly string CodeNotExiting = "NotExiting";
        private static readonly string CodeIneligibleOther = "IneligibleOther";
        private static readonly string CodeDeclined = "Declined";

        public static readonly string StateInitial = "Initial";
        public static readonly string StateInProgress = "InProgress";
        public static readonly string StateFinal = "Final";

        public static readonly EmployeeStatusEnum New = new EmployeeStatusEnum
        {
            Code = CodeNew,
            State = StateInitial,
            Description = "Newly-added. No email sent yet. Initial state for all employees."
        };
        public static readonly EmployeeStatusEnum WelcomeEmailSent = new EmployeeStatusEnum
        {
            Code = CodeWelcomeEmailSent,
            State = StateInProgress,
            Description = "First email sent."
        };
        public static readonly EmployeeStatusEnum Reminder1Sent = new EmployeeStatusEnum
        {
            Code = CodeReminder1Sent,
            State = StateInProgress,
            Description = "First reminder sent."
        };
        public static readonly EmployeeStatusEnum Reminder2Sent = new EmployeeStatusEnum
        {
            Code = CodeReminder2Sent,
            State = StateInProgress,
            Description = "Second reminder sent."
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
            State = StateFinal,
            Description = "Snail mail has been sent."
        };
        public static readonly EmployeeStatusEnum NotExiting = new EmployeeStatusEnum
        {
            Code = CodeNotExiting,
            State = StateFinal,
            Description = "This employee is not actually exiting."
        };
        public static readonly EmployeeStatusEnum IneligibleOther = new EmployeeStatusEnum
        {
            Code = CodeIneligibleOther,
            State = StateFinal,
            Description = "Other ineligibility reason."
        };
        public static readonly EmployeeStatusEnum Declined = new EmployeeStatusEnum
        {
            Code = CodeDeclined,
            State = StateFinal,
            Description = "The employee has asked not to complete the survey."
        };

        public static readonly List<EmployeeStatusEnum> AllValues = new List<EmployeeStatusEnum>
        {
            New,
            WelcomeEmailSent,
            Reminder1Sent,
            Reminder2Sent,
            SurveyComplete,
            SnailMailSent,
            NotExiting,
            IneligibleOther,
            Declined
        };


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