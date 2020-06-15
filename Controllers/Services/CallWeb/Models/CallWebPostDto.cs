using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    public class CallWebPostDto
    ***REMOVED***
        public string EmployeeId ***REMOVED*** get; set; ***REMOVED***
        public string PreferredEmail ***REMOVED*** get; set; ***REMOVED***
        public string Ministry ***REMOVED*** get; set; ***REMOVED***
        public string PositionTitle ***REMOVED*** get; set; ***REMOVED***
        public string AppointmentStatus ***REMOVED*** get; set; ***REMOVED***
        public string PreferredFirstName ***REMOVED*** get; set; ***REMOVED***
        public string LastName ***REMOVED*** get; set; ***REMOVED***
        public string LeaveReason ***REMOVED*** get; set; ***REMOVED***
        public string LeaveCode ***REMOVED*** get; set; ***REMOVED***
        public string EffectiveDate ***REMOVED*** get; set; ***REMOVED***
        public string ExitCount ***REMOVED*** get; set; ***REMOVED***
        public string AdditionalJobCount ***REMOVED*** get; set; ***REMOVED***
        public string CurrentStatus ***REMOVED*** get; set; ***REMOVED***

        public static CallWebPostDto FromEmployee(Employee employee)
        ***REMOVED***
            return new CallWebPostDto()
            ***REMOVED***
                EmployeeId = employee.GovernmentEmployeeId,
                PreferredEmail = employee.PreferredEmail,
                Ministry = employee.Ministry,
                PositionTitle = employee.PositionTitle,
                AppointmentStatus = employee.AppointmentStatus,
                PreferredFirstName = employee.PreferredFirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                LeaveCode = employee.LeaveCode, // TODO: adjust
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                ExitCount = employee.ExitCount,
                AdditionalJobCount = employee.RecordCount,
                CurrentStatus = employee.CurrentEmployeeStatusCode
          ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
***REMOVED***