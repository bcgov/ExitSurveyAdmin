using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***

    public class CallWebService
    ***REMOVED***
        private CallWebApi CallWebApi;

        public CallWebService(
            IOptions<CallWebServiceOptions> options,
            IHttpClientFactory clientFactory
        )
        ***REMOVED***
            CallWebApi = new CallWebApi(options.Value.BaseUrl, clientFactory);
      ***REMOVED***

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(Employee employee)
        ***REMOVED***
            var callWebDto = await CallWebApi.GetOne(employee.Telkey);

            if (callWebDto.IsSurveyComplete)
            ***REMOVED***
                return EmployeeStatusEnum.SurveyComplete.Code;
          ***REMOVED***

            return callWebDto.CurrentStatus;
      ***REMOVED***

        public async Task<string> CreateSurvey(Employee employee)
        ***REMOVED***
            var callWebPostDto = CallWebPostDto.FromEmployee(employee);
            var callWebDto = await CallWebApi.Post(callWebPostDto);

            return callWebDto.Telkey;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
