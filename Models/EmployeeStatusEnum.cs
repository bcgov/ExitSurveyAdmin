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

        public static readonly string StateInitial = "Initial";
        public static readonly string StateInProgress = "InProgress";
        public static readonly string StateFinal = "Final";

        public static readonly EmployeeStatusEnum NEW = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeNew,
            State = StateInitial,
            Description = "Newly-added. No email sent yet. Initial state for all employees."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum WELCOME_EMAIL_SENT = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeWelcomeEmailSent,
            State = StateInProgress,
            Description = "First email sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum REMINDER_1_SENT = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeReminder1Sent,
            State = StateInProgress,
            Description = "First reminder sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum REMINDER_2_SENT = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeReminder2Sent,
            State = StateInProgress,
            Description = "Second reminder sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum SURVEY_COMPLETE = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeSurveyComplete,
            State = StateFinal,
            Description = "Survey has been finished."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum SNAIL_MAIL_SENT = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeSnailMailSent,
            State = StateFinal,
            Description = "Snail mail has been sent."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum NOT_EXITING = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeNotExiting,
            State = StateFinal,
            Description = "This employee is not actually exiting."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum INELIGIBLE_OTHER = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeIneligibleOther,
            State = StateFinal,
            Description = "Other ineligibility reason."
      ***REMOVED***;
        public static readonly EmployeeStatusEnum DECLINED = new EmployeeStatusEnum
        ***REMOVED***
            Code = CodeDeclined,
            State = StateFinal,
            Description = "The employee has asked not to complete the survey."
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