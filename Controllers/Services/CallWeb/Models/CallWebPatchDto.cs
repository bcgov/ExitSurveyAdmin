using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    // The data transfer object to use when sending a PATCH request.
    public class CallWebPatchDto
    ***REMOVED***
        public string Email ***REMOVED*** get; set; ***REMOVED***
        public string Ministry ***REMOVED*** get; set; ***REMOVED***
        public string FirstName ***REMOVED*** get; set; ***REMOVED***
        public string LastName ***REMOVED*** get; set; ***REMOVED***
        public string LeaveReason ***REMOVED*** get; set; ***REMOVED***
        public int? LeaveCode ***REMOVED*** get; set; ***REMOVED***
        public string EffectiveDate ***REMOVED*** get; set; ***REMOVED***
        public string CurrentStatus ***REMOVED*** get; set; ***REMOVED***

        public static CallWebPatchDto FromEmployee(Employee employee)
        ***REMOVED***
            return new CallWebPatchDto()
            ***REMOVED***
                Email = employee.GovernmentEmail,
                Ministry = employee.Ministry,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                CurrentStatus = employee.CurrentEmployeeStatusCode
          ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
***REMOVED***