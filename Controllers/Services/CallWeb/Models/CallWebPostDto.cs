using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    public class CallWebPostDto
    ***REMOVED***
        public string EmployeeId ***REMOVED*** get; set; ***REMOVED***
        public string Email ***REMOVED*** get; set; ***REMOVED***
        public string Ministry ***REMOVED*** get; set; ***REMOVED***
        public string FirstName ***REMOVED*** get; set; ***REMOVED***
        public string LastName ***REMOVED*** get; set; ***REMOVED***
        public string LeaveReason ***REMOVED*** get; set; ***REMOVED***
        public string EffectiveDate ***REMOVED*** get; set; ***REMOVED***
        public string ExitCount ***REMOVED*** get; set; ***REMOVED***
        public string AdditionalJobCount ***REMOVED*** get; set; ***REMOVED***
        public string CurrentStatus ***REMOVED*** get; set; ***REMOVED***

        public static CallWebPostDto FromEmployee(Employee employee)
        ***REMOVED***
            return new CallWebPostDto()
            ***REMOVED***
                EmployeeId = employee.GovernmentEmployeeId,
                Email = employee.GovernmentEmail,
                Ministry = employee.Ministry,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                LeaveReason = employee.Reason,
                EffectiveDate = employee.EffectiveDate.ToString("yyyy-MM-dd"),
                ExitCount = employee.ExitCount,
                AdditionalJobCount = employee.RecordCount,
                CurrentStatus = employee.CurrentEmployeeStatusCode
          ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
***REMOVED***