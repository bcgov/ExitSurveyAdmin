using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using CallWebApi.Models;
using System.Threading.Tasks;

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

        private string UrlForTelkey(string telkey)
        {
            return $"{BaseUrl}{telkey}";
        }

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(string telkey)
        {
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                UrlForTelkey(telkey)
            );
            var client = ClientFactory.CreateClient();

            try
            {
                // Get the survey status from the CallWebApi.
                var response = await client.SendAsync(request);
                var responseAsString = await response.Content.ReadAsStringAsync();

                var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(
                    responseAsString
                );

                return callWebDto.CurrentStatus;
            }
            catch (HttpRequestException e)
            {
                throw e;
            }

        }
    }
}
