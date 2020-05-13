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
{

    public class CallWebService
    {
        private string BaseUrl;

        private readonly IHttpClientFactory ClientFactory;

        public CallWebService(
            IOptions<CallWebServiceOptions> options,
            IHttpClientFactory clientFactory
        )
        {
            BaseUrl = options.Value.BaseUrl;
            ClientFactory = clientFactory;
        }

        private HttpClient GetClient()
        {
            return ClientFactory.CreateClient(Startup.HttpClientName);
        }

        private string UrlForPost()
        {
            return BaseUrl;
        }

        private HttpRequestMessage HttpGetByTelkey(string telkey)
        {
            return new HttpRequestMessage(
                HttpMethod.Get,
                $"{BaseUrl}{telkey}"
            );
        }

        private string Serialize(object value)
        {
            return JsonConvert.SerializeObject(value);
        }

        private StringContent ToJsonContent(object obj)
        {
            var serialized = Serialize(obj);

            return new StringContent(
                Serialize(obj), Encoding.UTF8, "application/json"
            );
        }

        private async Task<CallWebRowDto> CallWebRowFromResponse(
            HttpResponseMessage response
        )
        {
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(
                responseAsString
            );

            return callWebDto;
        }

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(Employee employee)
        {
            var request = HttpGetByTelkey(employee.Telkey);

            // Get the survey status from the CallWebApi.
            var response = await GetClient().SendAsync(request);
            var callWebDto = await CallWebRowFromResponse(response);

            if (callWebDto.IsSurveyComplete)
            {
                return EmployeeStatusEnum.SurveyComplete.Code;
            }

            return callWebDto.CurrentStatus;
            // catch (HttpRequestException e)
            // {
            //     throw e;
            // }
        }

        public async Task<string> CreateSurvey(
            Employee employee
        )
        {
            var content = ToJsonContent(CallWebPostDto.FromEmployee(employee));

            try
            {
                // Get the survey status from the CallWebApi.
                var response = await GetClient().PostAsync(UrlForPost(), content);
                var callWebDto = await CallWebRowFromResponse(response);

                return callWebDto.Telkey;
            }
            catch (HttpRequestException e)
            {
                throw e;
            }
        }
    }
}
