using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeActionEnum
    ***REMOVED***
        private static readonly string CodeCreateFromCSV = "CreateFromCSV";
        private static readonly string CodeCreateFromDataTransfer = "CreateFromDataTransfer";
        private static readonly string CodeUpdateByAdmin = "UpdateByAdmin";
        private static readonly string CodeUpdateByTask = "UpdateByTask";
        private static readonly string CodeStatusChange = "StatusChange";
        private static readonly string CodeEmailSent = "EmailSent";
        private static readonly string CodeSurveyRetrieved = "SurveyRetrieved";

        public static readonly EmployeeActionEnum CreateFromCSV = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeCreateFromCSV,
            Description = "The employee has been created by the CSV import task."
      ***REMOVED***;
        public static readonly EmployeeActionEnum CreateFromDataTransfer = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeCreateFromDataTransfer,
            Description = "The employee has been created via transfer from the old system."
      ***REMOVED***;
        public static readonly EmployeeActionEnum UpdateByAdmin = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeUpdateByAdmin,
            Description = "The employee has had one or more fields updated by an admin user."
      ***REMOVED***;
        public static readonly EmployeeActionEnum UpdateByTask = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeUpdateByTask,
            Description = "The employee has had one or more fields updated by the CSV import task."
      ***REMOVED***;
        public static readonly EmployeeActionEnum StatusChange = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeStatusChange,
            Description = "The employee has had their status changed (see StatusEnumeration)."
      ***REMOVED***;
        public static readonly EmployeeActionEnum EmailSent = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeEmailSent,
            Description = "An email was sent. This will normally be immediately followed by a StatusChange entry."
      ***REMOVED***;
        public static readonly EmployeeActionEnum SurveyRetrieved = new EmployeeActionEnum
        ***REMOVED***
            Code = CodeSurveyRetrieved,
            Description = "The survey value was retrieved. This will normally be immediately followed by a StatusChange entry."
      ***REMOVED***;

        public static readonly List<EmployeeActionEnum> AllValues = new List<EmployeeActionEnum>
        ***REMOVED***
            CreateFromCSV,
            CreateFromDataTransfer,
            UpdateByAdmin,
            UpdateByTask,
            StatusChange,
            EmailSent,
            SurveyRetrieved
      ***REMOVED***;

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual List<EmployeeTimelineEntry> TimelineEntries ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***