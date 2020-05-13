using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***

    internal class CallWebApi
    ***REMOVED***
        private string BaseUrl;

        private readonly IHttpClientFactory ClientFactory;

        public CallWebApi(string baseUrl, IHttpClientFactory clientFactory)
        ***REMOVED***
            BaseUrl = baseUrl;
            ClientFactory = clientFactory;
      ***REMOVED***

        private HttpClient GetClient()
        ***REMOVED***
            // The HttpClientName is specified as a constant in Startup.cs.
            return ClientFactory.CreateClient(Startup.HttpClientName);
      ***REMOVED***

        private StringContent ToJsonContent(object obj)
        ***REMOVED***
            var serializedObj = JsonConvert.SerializeObject(obj);

            return new StringContent(
                serializedObj, Encoding.UTF8, "application/json"
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

        public async Task<CallWebRowDto> GetOne(string telkey)
        ***REMOVED***
            var response = await GetClient().GetAsync($"***REMOVED***BaseUrl***REMOVED******REMOVED***telkey***REMOVED***");
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***

        public async Task<CallWebRowDto> Post(CallWebPostDto postDto)
        ***REMOVED***
            var content = ToJsonContent(postDto);

            var response = await GetClient().PostAsync(BaseUrl, content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***

        public async Task<CallWebRowDto> Patch(CallWebPatchDto patchDto)
        ***REMOVED***
            var content = ToJsonContent(patchDto);

            var response = await GetClient().PatchAsync(BaseUrl, content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
