using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeStatusEnum
    ***REMOVED***
        private static readonly string CodeNew = "New";
        private static readonly string CodeWelcomeEmailSent = "WelcomeEmailSent";
        private static readonly string CodeReminder1Sent = "Reminder1Sent";
        private static readonly string CodeReminder2Sent = "Reminder2Sent";
        private static readonly string CodeSurveyComplete = "SurveyComplete";
        private static readonly string CodeSnailMailSent = "SnailMailSent";
        private static readonly string CodeNotExiting = "NotExiting";
        private static readonly string CodeIneligibleOther = "IneligibleOther";
        private static readonly string CodeDeclined = "Declined";
        private static readonly string CodeExpired = "Expired";

        public static readonly string StateActive = "Active";
        public static readonly string StateFinal = "Final";

        public static readonly EmployeeStatusEnum New = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeNew,
            State = StateActive,
            Description = "Newly-added. No email sent yet. Initial state for all employees."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum WelcomeEmailSent = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeWelcomeEmailSent,
            State = StateActive,
            Description = "First email sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum Reminder1Sent = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeReminder1Sent,
            State = StateActive,
            Description = "First reminder sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum Reminder2Sent = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeReminder2Sent,
            State = StateActive,
            Description = "Second reminder sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum SurveyComplete = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeSurveyComplete,
            State = StateFinal,
            Description = "Survey has been finished."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum SnailMailSent = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeSnailMailSent,
            State = StateActive,
            Description = "Snail mail has been sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum NotExiting = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeNotExiting,
            State = StateFinal,
            Description = "This employee is not actually exiting."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum IneligibleOther = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeIneligibleOther,
            State = StateFinal,
            Description = "Other ineligibility reason."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum Declined = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeDeclined,
            State = StateFinal,
            Description = "The employee has asked not to complete the survey."
      ***REMOVED***;

        public static readonly EmployeeStatusEnum Expired = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeExpired,
            State = StateFinal,
            Description = "The employee's effective date has passed without completing the survey."
      ***REMOVED***;

        public static readonly List<EmployeeStatusEnum> AllValues = new List<EmployeeStatusEnum>
        ***REMOVED***
            New,
            WelcomeEmailSent,
            Reminder1Sent,
            Reminder2Sent,
            SurveyComplete,
            SnailMailSent,
            NotExiting,
            IneligibleOther,
            Declined,
            Expired
      ***REMOVED***;


        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string State ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual List<Employee> Employees ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual List<EmployeeTimelineEntry> TimelineEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***