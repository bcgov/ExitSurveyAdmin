using System.Net;
using System;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using CallWebApi.Models;
using System.Threading.Tasks;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin;

namespace ExitSurveyAdmin.Services
***REMOVED***

    public class CallWebService
    ***REMOVED***
        private string BaseUrl;

        private readonly IHttpClientFactory ClientFactory;

        public CallWebService(
            IOptions<CallWebServiceOptions> options,
            IHttpClientFactory clientFactory
        )
        ***REMOVED***
            BaseUrl = options.Value.BaseUrl;
            ClientFactory = clientFactory;
      ***REMOVED***

        private HttpClient GetClient()
        ***REMOVED***
            return ClientFactory.CreateClient(Startup.HttpClientName);
      ***REMOVED***

        private string UrlForPost()
        ***REMOVED***
            return BaseUrl;
      ***REMOVED***

        private HttpRequestMessage HttpGetByTelkey(string telkey)
        ***REMOVED***
            return new HttpRequestMessage(
                HttpMethod.Get,
                $"***REMOVED***BaseUrl***REMOVED******REMOVED***telkey***REMOVED***"
            );
      ***REMOVED***

        private string Serialize(object value)
        ***REMOVED***
            return JsonConvert.SerializeObject(value);
      ***REMOVED***

        private StringContent ToJsonContent(object obj)
        ***REMOVED***
            var serialized = Serialize(obj);

            return new StringContent(
                Serialize(obj), Encoding.UTF8, "application/json"
            );
      ***REMOVED***

        private async Task<CallWebRowDto> CallWebRowFromResponse(
            HttpResponseMessage response
        )
        ***REMOVED***
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(
                responseAsString
            );

            return callWebDto;
      ***REMOVED***

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(Employee employee)
        ***REMOVED***
            var request = HttpGetByTelkey(employee.Telkey);

            // Get the survey status from the CallWebApi.
            var response = await GetClient().SendAsync(request);
            var callWebDto = await CallWebRowFromResponse(response);

            if (callWebDto.IsSurveyComplete)
            ***REMOVED***
                return EmployeeStatusEnum.SurveyComplete.Code;
          ***REMOVED***

            return callWebDto.CurrentStatus;
            // catch (HttpRequestException e)
            // ***REMOVED***
            //     throw e;
            // ***REMOVED***
      ***REMOVED***

        public async Task<string> CreateSurvey(
            Employee employee
        )
        ***REMOVED***
            var content = ToJsonContent(CallWebPostDto.FromEmployee(employee));

            try
            ***REMOVED***
                // Get the survey status from the CallWebApi.
                var response = await GetClient().PostAsync(UrlForPost(), content);
                var callWebDto = await CallWebRowFromResponse(response);

                return callWebDto.Telkey;
          ***REMOVED***
            catch (HttpRequestException e)
            ***REMOVED***
                throw e;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
