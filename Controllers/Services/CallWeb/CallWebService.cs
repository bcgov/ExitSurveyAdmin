using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.CallWeb
***REMOVED***
    public class CallWebService
    ***REMOVED***
        private CallWebApi CallWebApi;

        public CallWebService(
            IOptions<CallWebServiceOptions> options,
            IHttpClientFactory clientFactory
        )
        ***REMOVED***
            CallWebApi = new CallWebApi(
                options.Value.BaseUrl,
                options.Value.ClientId,
                options.Value.ClientSecret,
                options.Value.TokenRequestUrl,
                clientFactory
            );
      ***REMOVED***

        // Determines whether a survey is complete, given multiple employees.
        public async Task<List<Tuple<EmployeeResult, string>>> GetSurveyStatusCodes(
            List<Employee> employees
        )
        ***REMOVED***
            var telkeys = employees.Select(e => e.Telkey).ToArray();

            if (telkeys.Count() != employees.Count())
            ***REMOVED***
                throw new Exception("telkeys.Count != employees.Count!");
          ***REMOVED***

            var callWebDtos = (await CallWebApi.GetMultiple(telkeys)).ToList();

            var results = new List<Tuple<EmployeeResult, string>>();

            foreach (var e in employees)
            ***REMOVED***
                var callWebDto = callWebDtos.Find(dto => dto.Telkey == e.Telkey);
                var employeeResult = new EmployeeResult(e);
                string statusCode = null;

                if (callWebDto == null)
                ***REMOVED***
                    employeeResult.AddException(new CallWebRetrieveFailedException());
              ***REMOVED***
                else
                ***REMOVED***
                    statusCode =
                        (IsSurveyComplete(callWebDto))
                            ? EmployeeStatusEnum.SurveyComplete.Code
                            : callWebDto.CurrentStatus;
              ***REMOVED***
                results.Add(Tuple.Create(employeeResult, statusCode));
          ***REMOVED***

            return results;
      ***REMOVED***

        private bool IsSurveyComplete(CallWebRowDto callWebDto)
        ***REMOVED***
            return callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1");
      ***REMOVED***

        public async Task<TaskResult<Employee>> CreateSurveys(List<Employee> employees)
        ***REMOVED***
            var taskResult = new TaskResult<Employee>();

            try
            ***REMOVED***
                var callWebPostDtos = employees
                    .Select(e => CallWebPostDto.FromEmployee(e))
                    .ToList();

                var results = (await CallWebApi.PostMultiple(callWebPostDtos)).ToList();

                foreach (var employee in employees)
                ***REMOVED***
                    // We can't compare telkeys because the employes we're
                    // trying to create don't have them yet. Instead, compare on
                    // first name, last name, and ministry.
                    var result = results.Find(
                        result =>
                            employee.PreferredFirstName.Equals(result.PreferredFirstName)
                            && employee.LastName.Equals(result.LastName)
                            && employee.Ministry.Equals(result.Ministry)
                    );

                    if (result == null)
                    ***REMOVED***
                        taskResult.AddFailedWithException(
                            employee,
                            new CallWebNoTelkeyException(
                                $"No telkey in CreateSurveys result for ***REMOVED***employee***REMOVED***"
                            )
                        );
                  ***REMOVED***
                    else
                    ***REMOVED***
                        employee.Telkey = result.Telkey;
                        taskResult.AddSucceeded(employee);
                  ***REMOVED***
              ***REMOVED***
          ***REMOVED***
            catch (Exception exception)
            ***REMOVED***
                // Assume the entire operation failed.
                taskResult.AddFailed(employees);
                taskResult.AddException(
                    new CallWebCreateFailedException(
                        $"CreateSurveys failed for a range of employees: ***REMOVED***String.Join(", ", employees)***REMOVED***. Error: ***REMOVED***exception.Message***REMOVED***"
                    )
                );
          ***REMOVED***

            return taskResult;
      ***REMOVED***

        public async Task<List<EmployeeResult>> UpdateSurveys(List<Employee> employees)
        ***REMOVED***
            var callWebPatchDtos = employees.Select(e => CallWebPatchDto.FromEmployee(e)).ToList();
            var results = (await CallWebApi.PatchMultiple(callWebPatchDtos)).ToList();

            var employeeResults = employees
                .Select(employee =>
                ***REMOVED***
                    var result = results.Find(result => employee.Telkey.Equals(result.Telkey));

                    if (result == null)
                    ***REMOVED***
                        return new EmployeeResult(
                            employee,
                            new CallWebUpdateFailedException(
                                "Employee not present in UpdateSurveys result."
                            )
                        );
                  ***REMOVED***
                    else
                    ***REMOVED***
                        return new EmployeeResult(employee);
                  ***REMOVED***
              ***REMOVED***)
                .ToList();

            return employeeResults;
      ***REMOVED***

        public async Task<CallWebRowDto[]> ListAll()
        ***REMOVED***
            var response = await CallWebApi.GetAll();

            return response;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
