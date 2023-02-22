using ExitSurveyAdmin.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.PsaApi
***REMOVED***
    internal class PsaApi
    ***REMOVED***
        private string EsaDataUrl;
        private string ClientUsername;
        private string ClientPassword;

        private readonly IHttpClientFactory ClientFactory;

        public PsaApi(
            string esaDataUrl,
            string clientUsername,
            string clientPassword,
            IHttpClientFactory clientFactory
        )
        ***REMOVED***
            EsaDataUrl = esaDataUrl;
            ClientUsername = clientUsername;
            ClientPassword = clientPassword;
            ClientFactory = clientFactory;
      ***REMOVED***

        private HttpClient GetClient()
        ***REMOVED***
            // The HttpClientName is specified as a constant in Startup.cs.
            return ClientFactory.CreateClient(Startup.HttpClientName);
      ***REMOVED***

        // Get a client that has had the Authorization header set to use the
        // access token.
        private HttpClient GetClientWithBasicAuth()
        ***REMOVED***
            var client = GetClient();

            var unencodedUsernamePassword = $"***REMOVED***ClientUsername***REMOVED***:***REMOVED***ClientPassword***REMOVED***";
            var encodedUsernamePassword = Convert.ToBase64String(
                System.Text.ASCIIEncoding.UTF8.GetBytes(unencodedUsernamePassword)
            );

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Basic",
                encodedUsernamePassword
            );

            return client;
      ***REMOVED***

        private EmployeeTaskResult EmployeesFromResponseString(string responseAsString)
        ***REMOVED***
            try
            ***REMOVED***
                List<string> errors = new List<string>();
                HashSet<int> employeeErrorIndices = new HashSet<int>();

                var settings = new JsonSerializerSettings();
                settings.DateFormatString = "YYYY-MM-DD";
                settings.ContractResolver = new PsaApiContractResolver();
                settings.Error = delegate(object sender, ErrorEventArgs args)
                ***REMOVED***
                    errors.Add(args.ErrorContext.Error.Message);

                    var pattern = @"value\[([0-9]+)\]";
                    var matches = Regex.Matches(args.ErrorContext.Path, pattern);
                    if (matches.Count > 0 && matches[0].Groups.Count > 1)
                    ***REMOVED***
                        // It's an error in a particular employee. The index of
                        // the employee in the entire JSON array of employee
                        // objects should be extracted; it is found in the regex
                        // matching group.
                        int employeeErrorIndex = Convert.ToInt32(matches[0].Groups[1].Value);
                        employeeErrorIndices.Add(employeeErrorIndex);
                  ***REMOVED***

                    args.ErrorContext.Handled = true;
              ***REMOVED***;

                var jsonObject = JsonConvert.DeserializeObject<PsaApiRequestDto>(
                    responseAsString,
                    settings
                );

                List<Employee> goodEmployees = new List<Employee>();

                // We need to see which of the employees did NOT have errors,
                // based on their index in the JSON array of employee objects.
                for (var i = 0; i < jsonObject.Employees.Count; i++)
                ***REMOVED***
                    if (!employeeErrorIndices.Contains(i))
                    ***REMOVED***
                        // If we didn't get an error on an employee at this
                        // index, then add them to the good employees.
                        goodEmployees.Add(jsonObject.Employees[i]);
                  ***REMOVED***
              ***REMOVED***

                return new EmployeeTaskResult(
                    TaskEnum.ParsePsa,
                    jsonObject.Employees.Count,
                    goodEmployees,
                    errors
                );
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                throw new EmployeesFromResponseStringException(
                    "Could not deserialize employees from response string. Possibly the server is unavailable, or it did not return the expected response.",
                    e
                );
          ***REMOVED***
      ***REMOVED***

        private async Task<string> ResponseAsString(HttpResponseMessage responseMessage)
        ***REMOVED***
            try
            ***REMOVED***
                var responseAsString = await responseMessage.Content.ReadAsStringAsync();

                return responseAsString;
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                throw new ResponseAsStringException("Could not read response as string.", e);
          ***REMOVED***
      ***REMOVED***

        public async Task<EmployeeTaskResult> GetAllEmployees(LoggingService logger)
        ***REMOVED***
            var client = GetClientWithBasicAuth();
            var response = await client.GetAsync($"***REMOVED***EsaDataUrl***REMOVED***");
            var responseString = await ResponseAsString(response);
            if (response.IsSuccessStatusCode && responseString.Length > 0)
            ***REMOVED***
                await logger.LogSuccess(
                    TaskEnum.LoadPsa,
                    $"Load successful. JSON: ***REMOVED***responseString***REMOVED***"
                );
                var taskResult = EmployeesFromResponseString(responseString);
                return taskResult;
          ***REMOVED***
            else
            ***REMOVED***
                await logger.LogFailure(
                    TaskEnum.LoadPsa,
                    $"Load unsuccessful. Response code: ***REMOVED***response***REMOVED***. Content, if any: ***REMOVED***responseString***REMOVED***"
                );
          ***REMOVED***
            return null;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
