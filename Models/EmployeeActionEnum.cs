using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeActionEnum
    ***REMOVED***
        public static readonly string CODE_CREATE_FROM_CSV = "CreateFromCSV";
        public static readonly string CODE_CREATE_FROM_DATA_TRANSFER = "CreateFromDataTransfer";
        public static readonly string CODE_UPDATE_BY_ADMIN = "UpdateByAdmin";
        public static readonly string CODE_UPDATE_BY_TASK = "UpdateByTask";
        public static readonly string CODE_STATUS_CHANGE = "StatusChange";
        public static readonly string CODE_EMAIL_SENT = "EmailSent";
        public static readonly string CODE_SURVEY_RETRIEVED = "SurveyRetrieved";

        public static readonly EmployeeActionEnum CREATE_FROM_CSV = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_CREATE_FROM_CSV,
            Description = "The employee has been created by the CSV import task."
      ***REMOVED***;
        public static readonly EmployeeActionEnum CREATE_FROM_DATA_TRANSFER = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_CREATE_FROM_DATA_TRANSFER,
            Description = "The employee has been created via transfer from the old system."
      ***REMOVED***;
        public static readonly EmployeeActionEnum UPDATE_BY_ADMIN = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_UPDATE_BY_ADMIN,
            Description = "The employee has had one or more fields updated by an admin user."
      ***REMOVED***;
        public static readonly EmployeeActionEnum UPDATE_BY_TASK = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_UPDATE_BY_TASK,
            Description = "The employee has had one or more fields updated by the CSV import task."
      ***REMOVED***;
        public static readonly EmployeeActionEnum STATUS_CHANGE = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_STATUS_CHANGE,
            Description = "The employee has had their status changed (see StatusEnumeration)."
      ***REMOVED***;
        public static readonly EmployeeActionEnum EMAIL_SENT = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_EMAIL_SENT,
            Description = "An email was sent. This will normally be immediately followed by a StatusChange entry."
      ***REMOVED***;
        public static readonly EmployeeActionEnum SURVEY_RETRIEVED = new EmployeeActionEnum
        ***REMOVED***
            Code = CODE_SURVEY_RETRIEVED,
            Description = "The survey value was retrieved. This will normally be immediately followed by a StatusChange entry."
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