using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeActionEnum
    {
        private static readonly string CodeCreateFromCSV = "CreateFromCSV";
        private static readonly string CodeCreateFromDataTransfer = "CreateFromDataTransfer";
        private static readonly string CodeUpdateByAdmin = "UpdateByAdmin";
        private static readonly string CodeUpdateByTask = "UpdateByTask";
        private static readonly string CodeStatusChange = "StatusChange";
        private static readonly string CodeEmailSent = "EmailSent";
        private static readonly string CodeSurveyRetrieved = "SurveyRetrieved";

        public static readonly EmployeeActionEnum CreateFromCSV = new EmployeeActionEnum
        {
            Code = CodeCreateFromCSV,
            Description = "The employee has been created by the CSV import task."
        };
        public static readonly EmployeeActionEnum CreateFromDataTransfer = new EmployeeActionEnum
        {
            Code = CodeCreateFromDataTransfer,
            Description = "The employee has been created via transfer from the old system."
        };
        public static readonly EmployeeActionEnum UpdateByAdmin = new EmployeeActionEnum
        {
            Code = CodeUpdateByAdmin,
            Description = "The employee has had one or more fields updated by an admin user."
        };
        public static readonly EmployeeActionEnum UpdateByTask = new EmployeeActionEnum
        {
            Code = CodeUpdateByTask,
            Description = "The employee has had one or more fields updated by the CSV import task."
        };
        public static readonly EmployeeActionEnum StatusChange = new EmployeeActionEnum
        {
            Code = CodeStatusChange,
            Description = "The employee has had their status changed (see StatusEnumeration)."
        };
        public static readonly EmployeeActionEnum EmailSent = new EmployeeActionEnum
        {
            Code = CodeEmailSent,
            Description = "An email was sent. This will normally be immediately followed by a StatusChange entry."
        };
        public static readonly EmployeeActionEnum SurveyRetrieved = new EmployeeActionEnum
        {
            Code = CodeSurveyRetrieved,
            Description = "The survey value was retrieved. This will normally be immediately followed by a StatusChange entry."
        };

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public virtual List<EmployeeTimelineEntry> TimelineEntries { get; set; }
    }
}