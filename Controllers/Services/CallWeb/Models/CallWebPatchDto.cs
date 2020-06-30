using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    // The data transfer object to use when sending a PATCH request.
    public class CallWebPatchDto
    ***REMOVED***
        public string Telkey ***REMOVED*** get; set; ***REMOVED***
        public string PreferredEmail ***REMOVED*** get; set; ***REMOVED***
        public string Ministry ***REMOVED*** get; set; ***REMOVED***
        public string PositionTitle ***REMOVED*** get; set; ***REMOVED***
        public string AppointmentStatus ***REMOVED*** get; set; ***REMOVED***
        public string PreferredFirstName ***REMOVED*** get; set; ***REMOVED***
        public string LastName ***REMOVED*** get; set; ***REMOVED***
        public string LeaveReason ***REMOVED*** get; set; ***REMOVED***
        public string LeaveCode ***REMOVED*** get; set; ***REMOVED***
        public string EffectiveDate ***REMOVED*** get; set; ***REMOVED***
        public string CurrentStatus ***REMOVED*** get; set; ***REMOVED***
        public string SurveyWindowFlag ***REMOVED*** get; set; ***REMOVED***

        public static CallWebPatchDto FromEmployee(Employee employee)
        ***REMOVED***
            return new CallWebPatchDto()
            ***REMOVED***
                Telkey = employee.Telkey,
                PreferredEmail = employee.PreferredEmail,
                Ministry = employee.Ministry,
                PositionTitle = employee.PositionTitle,
                AppointmentStatus = employee.AppointmentStatus,
                PreferredFirstName = employee.PreferredFirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                LeaveCode = employee.LeaveCode,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                CurrentStatus = employee.CurrentEmployeeStatusCode,
                SurveyWindowFlag = employee.SurveyWindowFlag
          ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
***REMOVED***