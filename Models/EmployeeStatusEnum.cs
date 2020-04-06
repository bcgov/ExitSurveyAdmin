using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeStatusEnum
    {
        public static readonly string CODE_NEW = "New";
        public static readonly string CODE_WELCOME_EMAIL_SENT = "WelcomeEmailSent";
        public static readonly string CODE_REMINDER_1_SENT = "Reminder1Sent";
        public static readonly string CODE_REMINDER_2_SENT = "Reminder2Sent";
        public static readonly string CODE_SURVEY_COMPLETE = "SurveyComplete";
        public static readonly string CODE_SNAIL_MAIL_SENT = "SnailMailSent";
        public static readonly string CODE_NOT_EXITING = "NotExiting";
        public static readonly string CODE_INELIGIBLE_OTHER = "IneligibleOther";
        public static readonly string CODE_DECLINED = "Declined";

        public static readonly string STATE_INITIAL = "Initial";
        public static readonly string STATE_IN_PROGRESS = "InProgress";
        public static readonly string STATE_FINAL = "Final";

        public static readonly EmployeeStatusEnum NEW = new EmployeeStatusEnum
        {
            Code = CODE_NEW,
            State = STATE_INITIAL,
            Description = "Newly-added. No email sent yet. Initial state for all employees."
        };
        public static readonly EmployeeStatusEnum WELCOME_EMAIL_SENT = new EmployeeStatusEnum
        {
            Code = CODE_WELCOME_EMAIL_SENT,
            State = STATE_IN_PROGRESS,
            Description = "First email sent."
        };
        public static readonly EmployeeStatusEnum REMINDER_1_SENT = new EmployeeStatusEnum
        {
            Code = CODE_REMINDER_1_SENT,
            State = STATE_IN_PROGRESS,
            Description = "First reminder sent."
        };
        public static readonly EmployeeStatusEnum REMINDER_2_SENT = new EmployeeStatusEnum
        {
            Code = CODE_REMINDER_2_SENT,
            State = STATE_IN_PROGRESS,
            Description = "Second reminder sent."
        };
        public static readonly EmployeeStatusEnum SURVEY_COMPLETE = new EmployeeStatusEnum
        {
            Code = CODE_SURVEY_COMPLETE,
            State = STATE_FINAL,
            Description = "Survey has been finished."
        };
        public static readonly EmployeeStatusEnum SNAIL_MAIL_SENT = new EmployeeStatusEnum
        {
            Code = CODE_SNAIL_MAIL_SENT,
            State = STATE_FINAL,
            Description = "Snail mail has been sent."
        };
        public static readonly EmployeeStatusEnum NOT_EXITING = new EmployeeStatusEnum
        {
            Code = CODE_NOT_EXITING,
            State = STATE_FINAL,
            Description = "This employee is not actually exiting."
        };
        public static readonly EmployeeStatusEnum INELIGIBLE_OTHER = new EmployeeStatusEnum
        {
            Code = CODE_INELIGIBLE_OTHER,
            State = STATE_FINAL,
            Description = "Other ineligibility reason."
        };
        public static readonly EmployeeStatusEnum DECLINED = new EmployeeStatusEnum
        {
            Code = CODE_DECLINED,
            State = STATE_FINAL,
            Description = "The employee has asked not to complete the survey."
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