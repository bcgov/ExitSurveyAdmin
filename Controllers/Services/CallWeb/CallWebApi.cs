using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    internal class CallWebApi
    ***REMOVED***
        private string BaseUrl;
        private string ClientId;
        private string ClientSecret;
        private string TokenRequestUrl;

        private CallWebServiceTokenDto ServiceToken;

        private readonly IHttpClientFactory ClientFactory;

        public CallWebApi(
            string baseUrl,
            string clientId,
            string clientSecret,
            string tokenRequestUrl,
            IHttpClientFactory clientFactory
        )
        ***REMOVED***
            BaseUrl = baseUrl;
            ClientId = clientId;
            ClientSecret = clientSecret;
            TokenRequestUrl = tokenRequestUrl;
            ClientFactory = clientFactory;
      ***REMOVED***

        // Get an access token for the CallWeb API.
        private async Task<string> RefreshCallWebApiServiceToken()
        ***REMOVED***
            // If the service token is null, or if it's soon to expire, get a
            // new service token.
            if (
                ServiceToken == null
                || DateTimeOffset.Now.ToUnixTimeSeconds() >= ServiceToken.ExpiresAtUnix
            )
            ***REMOVED***
                var client = GetClient();

                var tokenRequestBodyDict = new Dictionary<string, string>();
                tokenRequestBodyDict.Add("grant_type", "client_credentials");
                tokenRequestBodyDict.Add("client_id", ClientId);
                tokenRequestBodyDict.Add("client_secret", ClientSecret);

                var res = await GetClient()
                    .PostAsync(TokenRequestUrl, new FormUrlEncodedContent(tokenRequestBodyDict));

                var responseAsString = await res.Content.ReadAsStringAsync();

                var token = JsonConvert.DeserializeObject<CallWebServiceTokenDto>(responseAsString);

                // Set the expiry time based on the current time plus the
                // length of time the token expires in, minus 60 seconds.
                token.ExpiresAtUnix =
                    DateTimeOffset.Now.ToUnixTimeSeconds() + token.expires_in - 60;
                ServiceToken = token;
          ***REMOVED***

            // Return the access token value from the stored service token.
            var accessToken = ServiceToken.access_token;

            return accessToken;
      ***REMOVED***

        private HttpClient GetClient()
        ***REMOVED***
            // The HttpClientName is specified as a constant in Startup.cs.
            return ClientFactory.CreateClient(Startup.HttpClientName);
      ***REMOVED***

        // Get a client that has had the Authorization header set to use the
        // access token.
        private async Task<HttpClient> GetClientWithServiceToken()
        ***REMOVED***
            string accessToken = await RefreshCallWebApiServiceToken();

            var client = GetClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                accessToken
            );

            return client;
      ***REMOVED***

        private StringContent ToJsonContent(object obj)
        ***REMOVED***
            var serializedObj = JsonConvert.SerializeObject(obj);

            return new StringContent(serializedObj, Encoding.UTF8, "application/json");
      ***REMOVED***

        private async Task<CallWebRowDto> CallWebRowFromResponse(HttpResponseMessage response)
        ***REMOVED***
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(responseAsString);

            return callWebDto;
      ***REMOVED***

        private async Task<List<CallWebRowDto>> CallWebRowsFromResponse(
            HttpResponseMessage response
        )
        ***REMOVED***
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDtos = JsonConvert.DeserializeObject<List<CallWebRowDto>>(responseAsString);

            return callWebDtos;
      ***REMOVED***

        public async Task<List<CallWebRowDto>> GetAll()
        ***REMOVED***
            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync($"***REMOVED***BaseUrl***REMOVED***");
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
      ***REMOVED***

        public async Task<CallWebRowDto> GetOne(string telkey)
        ***REMOVED***
            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync($"***REMOVED***BaseUrl***REMOVED******REMOVED***telkey***REMOVED***");
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***

        public async Task<List<CallWebRowDto>> GetMultiple(string[] telkeys)
        ***REMOVED***
            if (telkeys.Length == 0)
            ***REMOVED***
                throw new Exception("GetMultiple: telkeys.Length was 0");
          ***REMOVED***

            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync(
                $"***REMOVED***BaseUrl***REMOVED***Multi?telkeys=***REMOVED***String.Join(',', telkeys)***REMOVED***"
            );
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
      ***REMOVED***

        public async Task<CallWebRowDto> Post(CallWebPostDto postDto)
        ***REMOVED***
            var content = ToJsonContent(postDto);

            var client = await GetClientWithServiceToken();
            var response = await client.PostAsync(BaseUrl, content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***

        public async Task<List<CallWebRowDto>> PostMultiple(List<CallWebPostDto> postDtos)
        ***REMOVED***
            var content = ToJsonContent(postDtos.ToArray());

            var client = await GetClientWithServiceToken();
            var response = await client.PostAsync($"***REMOVED***BaseUrl***REMOVED***Multi", content);
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
      ***REMOVED***

        public async Task<CallWebRowDto> Patch(CallWebPatchDto patchDto)
        ***REMOVED***
            var content = ToJsonContent(patchDto);

            var client = await GetClientWithServiceToken();
            var response = await client.PatchAsync($"***REMOVED***BaseUrl***REMOVED******REMOVED***patchDto.Telkey***REMOVED***", content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
      ***REMOVED***

        public async Task<List<CallWebRowDto>> PatchMultiple(List<CallWebPatchDto> patchDtos)
        ***REMOVED***
            var content = ToJsonContent(patchDtos.ToArray());

            var client = await GetClientWithServiceToken();
            var response = await client.PatchAsync($"***REMOVED***BaseUrl***REMOVED***Multi", content);
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
