using System.Net;
using System;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Threading.Tasks;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin;

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
