using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using CallWebApi.Models;
using System.Threading.Tasks;

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

        private string UrlForTelkey(string telkey)
        ***REMOVED***
            return $"***REMOVED***BaseUrl***REMOVED******REMOVED***telkey***REMOVED***";
      ***REMOVED***

        // Determines whether a survey is complete, given a telkey.
        public async Task<string> GetSurveyStatusCode(string telkey)
        ***REMOVED***
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                UrlForTelkey(telkey)
            );
            var client = ClientFactory.CreateClient();

            try
            ***REMOVED***
                // Get the survey status from the CallWebApi.
                var response = await client.SendAsync(request);
                var responseAsString = await response.Content.ReadAsStringAsync();

                var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(
                    responseAsString
                );

                return callWebDto.CurrentStatus;
          ***REMOVED***
            catch (HttpRequestException e)
            ***REMOVED***
                throw e;
          ***REMOVED***

      ***REMOVED***
  ***REMOVED***
***REMOVED***
