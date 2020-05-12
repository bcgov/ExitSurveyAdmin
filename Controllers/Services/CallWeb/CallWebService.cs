using Microsoft.Extensions.Options;

namespace ExitSurveyAdmin.Services
{
    public class CallWebService
    {
        private string BaseUrl;

        public CallWebService(IOptions<CallWebServiceOptions> options)
        {
            BaseUrl = options.Value.BaseUrl;
        }

        // Determines whether a survey is complete, given an employee ID.
        public string GetSurveyStatus(string employeeId)
        {
            // Get the survey status from the CallWebApi.
            return BaseUrl;
        }
    }
}
