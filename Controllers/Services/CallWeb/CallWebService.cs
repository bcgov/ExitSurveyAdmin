using Microsoft.Extensions.Options;

namespace ExitSurveyAdmin.Services
***REMOVED***
    public class CallWebService
    ***REMOVED***
        private string BaseUrl;

        public CallWebService(IOptions<CallWebServiceOptions> options)
        ***REMOVED***
            BaseUrl = options.Value.BaseUrl;
      ***REMOVED***

        // Determines whether a survey is complete, given an employee ID.
        public string GetSurveyStatus(string employeeId)
        ***REMOVED***
            // Get the survey status from the CallWebApi.
            return BaseUrl;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
