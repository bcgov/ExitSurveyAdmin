using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ExitSurveyAdmin.Services.CallWeb
{
    internal class CallWebApi
    {
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
        {
            BaseUrl = baseUrl;
            ClientId = clientId;
            ClientSecret = clientSecret;
            TokenRequestUrl = tokenRequestUrl;
            ClientFactory = clientFactory;
        }

        // Get an access token for the CallWeb API.
        private async Task<string> RefreshCallWebApiServiceToken()
        {
            // If the service token is null, or if it's soon to expire, get a
            // new service token.
            if (
                ServiceToken == null
                || DateTimeOffset.Now.ToUnixTimeSeconds() >= ServiceToken.ExpiresAtUnix
            )
            {
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
            }

            // Return the access token value from the stored service token.
            var accessToken = ServiceToken.access_token;

            return accessToken;
        }

        private HttpClient GetClient()
        {
            // The HttpClientName is specified as a constant in Startup.cs.
            return ClientFactory.CreateClient(Startup.HttpClientName);
        }

        // Get a client that has had the Authorization header set to use the
        // access token.
        private async Task<HttpClient> GetClientWithServiceToken()
        {
            string accessToken = await RefreshCallWebApiServiceToken();

            var client = GetClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                accessToken
            );

            return client;
        }

        private StringContent ToJsonContent(object obj)
        {
            var serializedObj = JsonConvert.SerializeObject(obj);

            return new StringContent(serializedObj, Encoding.UTF8, "application/json");
        }

        private async Task<CallWebRowDto> CallWebRowFromResponse(HttpResponseMessage response)
        {
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDto = JsonConvert.DeserializeObject<CallWebRowDto>(responseAsString);

            return callWebDto;
        }

        private async Task<CallWebRowDto[]> CallWebRowsFromResponse(HttpResponseMessage response)
        {
            var responseAsString = await response.Content.ReadAsStringAsync();

            var callWebDtos = JsonConvert.DeserializeObject<CallWebRowDto[]>(responseAsString);

            return callWebDtos;
        }

        public async Task<CallWebRowDto[]> GetAll()
        {
            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync($"{BaseUrl}");
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
        }

        public async Task<CallWebRowDto> GetOne(string telkey)
        {
            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync($"{BaseUrl}{telkey}");
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
        }

        public async Task<CallWebRowDto[]> GetMultiple(string[] telkeys)
        {
            if (telkeys.Length == 0)
            {
                throw new Exception("telkeys.Length was 0");
            }

            var client = await GetClientWithServiceToken();
            var response = await client.GetAsync(
                $"{BaseUrl}Multi?telkeys={String.Join(',', telkeys)}"
            );
            var callWebDtos = await CallWebRowsFromResponse(response);

            return callWebDtos;
        }

        public async Task<CallWebRowDto> Post(CallWebPostDto postDto)
        {
            var content = ToJsonContent(postDto);

            var client = await GetClientWithServiceToken();
            var response = await client.PostAsync(BaseUrl, content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
        }

        public async Task<CallWebRowDto> Patch(CallWebPatchDto patchDto)
        {
            var content = ToJsonContent(patchDto);

            var client = await GetClientWithServiceToken();
            var response = await client.PatchAsync($"{BaseUrl}{patchDto.Telkey}", content);
            var callWebDto = await CallWebRowFromResponse(response);

            return callWebDto;
        }
    }
}
