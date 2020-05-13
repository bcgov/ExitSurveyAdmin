using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Threading.Tasks;

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

        public async Task<CallWebRowDto> UpdateSurvey(Employee employee)
        {
            var callWebPatchDto = CallWebPatchDto.FromEmployee(employee);
            var callWebDto = await CallWebApi.Patch(callWebPatchDto);

            return callWebDto;
        }
    }
}
