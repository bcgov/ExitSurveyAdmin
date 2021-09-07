using System;
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
            CallWebApi = new CallWebApi(
                options.Value.BaseUrl,
                options.Value.ClientId,
                options.Value.ClientSecret,
                options.Value.TokenRequestUrl,
                clientFactory
            );
      ***REMOVED***

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(Employee employee)
        ***REMOVED***
            var callWebDto = await CallWebApi.GetOne(employee.Telkey);

            if (callWebDto.IsSurveyComplete.Equals("1"))
            ***REMOVED***
                return EmployeeStatusEnum.SurveyComplete.Code;
          ***REMOVED***

            return callWebDto.CurrentStatus;
      ***REMOVED***

        public async Task<string> CreateSurvey(Employee employee)
        ***REMOVED***
            var callWebPostDto = CallWebPostDto.FromEmployee(employee);
            var callWebDto = await CallWebApi.Post(callWebPostDto);

            if (string.IsNullOrEmpty(callWebDto.Telkey))
            ***REMOVED***
                throw new InvalidOperationException("Telkey was not created.");
          ***REMOVED***

            return callWebDto.Telkey;
      ***REMOVED***

        public async Task<CallWebRowDto> UpdateSurvey(Employee employee)
        ***REMOVED***
            var callWebPatchDto = CallWebPatchDto.FromEmployee(employee);
            var callWebDto = await CallWebApi.Patch(callWebPatchDto);

            return callWebDto;
      ***REMOVED***

        public async Task<CallWebRowDto[]> ListAll()
        ***REMOVED***
            var response = await CallWebApi.GetAll();

            return response;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
