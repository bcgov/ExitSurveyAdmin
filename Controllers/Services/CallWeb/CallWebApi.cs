using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.CallWeb
{

    internal class CallWebApi
    {
        private string BaseUrl;

        private readonly IHttpClientFactory ClientFactory;

        public CallWebApi(string baseUrl, IHttpClientFactory clientFactory)
        {
            BaseUrl = baseUrl;
            ClientFactory = clientFactory;
        }

        private HttpClient GetClient()
        {
            // The HttpClientName is specified as a constant in Startup.cs.
            return ClientFactory.CreateClient(Startup.HttpClientName);
        }

        private StringContent ToJsonContent(object obj)
        {
            var serializedObj = JsonConvert.SerializeObject(obj);

            return new StringContent(
                serializedObj, Encoding.UTF8, "application/json"
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

        public async Task<CallWebRowDto> GetOne(string telkey)
        {
            var response = await GetClient().GetAsync($"{BaseUrl}{telkey}");
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
        }

        public async Task<CallWebRowDto> Post(CallWebPostDto postDto)
        {
            var content = ToJsonContent(postDto);

            var response = await GetClient().PostAsync(BaseUrl, content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
        }
    }
}
