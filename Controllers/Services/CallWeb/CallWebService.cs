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
{

    public class CallWebService
    {
        private CallWebApi CallWebApi;

        public CallWebService(
            IOptions<CallWebServiceOptions> options,
            IHttpClientFactory clientFactory
        )
        {
            CallWebApi = new CallWebApi(options.Value.BaseUrl, clientFactory);
        }

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(Employee employee)
        {
            var callWebDto = await CallWebApi.GetOne(employee.Telkey);

            if (callWebDto.IsSurveyComplete)
            {
                return EmployeeStatusEnum.SurveyComplete.Code;
            }

            return callWebDto.CurrentStatus;
        }

        public async Task<string> CreateSurvey(Employee employee)
        {
            var callWebPostDto = CallWebPostDto.FromEmployee(employee);
            var callWebDto = await CallWebApi.Post(callWebPostDto);

            return callWebDto.Telkey;
        }
    }
}
