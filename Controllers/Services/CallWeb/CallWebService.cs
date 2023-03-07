using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
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
            CallWebApi = new CallWebApi(
                options.Value.BaseUrl,
                options.Value.ClientId,
                options.Value.ClientSecret,
                options.Value.TokenRequestUrl,
                clientFactory
            );
        }

        // Determines whether a survey is complete, given multiple employees.
        public async Task<TaskResult<Tuple<Employee, string>>> GetSurveyStatusCodes(
            List<Employee> employees
        )
        {
            var taskResult = new TaskResult<Tuple<Employee, string>>();

            try
            {
                var telkeys = employees.Select(e => e.Telkey).ToArray();

                if (telkeys.Count() != employees.Count())
                {
                    throw new Exception("telkeys.Count != employees.Count!");
                }

                var results = (await CallWebApi.GetMultiple(telkeys)).ToList();

                foreach (var employee in employees)
                {
                    var result = results.Find(dto => dto.Telkey == employee.Telkey);

                    if (result == null)
                    {
                        taskResult.AddFailedWithException(
                            new Tuple<Employee, string>(employee, null),
                            new CallWebRetrieveFailedException(
                                $"No GetSurveyStatusCodes result for {employee}"
                            )
                        );
                    }
                    else
                    {
                        var statusCode =
                            (IsSurveyComplete(result))
                                ? EmployeeStatusEnum.SurveyComplete.Code
                                : result.CurrentStatus;
                        taskResult.AddSucceeded(new Tuple<Employee, string>(employee, statusCode));
                    }
                }
            }
            catch (Exception exception)
            {
                // Assume the entire operation failed.
                foreach (var employee in employees)
                {
                    taskResult.AddFailed(new Tuple<Employee, string>(employee, null));
                }
                taskResult.AddException(
                    new CallWebRetrieveFailedException(
                        $"GetSurveyStatusCodes failed for a range of employees: {String.Join(", ", employees)}. Error: {exception.Message}"
                    )
                );
            }

            return taskResult;
        }

        private bool IsSurveyComplete(CallWebRowDto callWebDto)
        {
            return callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1");
        }

        public async Task<TaskResult<Employee>> CreateSurveys(List<Employee> employees)
        {
            var taskResult = new TaskResult<Employee>();

            try
            {
                var callWebPostDtos = employees
                    .Select(e => CallWebPostDto.FromEmployee(e))
                    .ToList();

                var results = (await CallWebApi.PostMultiple(callWebPostDtos)).ToList();

                foreach (var employee in employees)
                {
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
                    {
                        taskResult.AddFailedWithException(
                            employee,
                            new CallWebNoTelkeyException(
                                $"No telkey in CreateSurveys result for {employee}"
                            )
                        );
                    }
                    else
                    {
                        employee.Telkey = result.Telkey;
                        taskResult.AddSucceeded(employee);
                    }
                }
            }
            catch (Exception exception)
            {
                // Assume the entire operation failed.
                taskResult.AddFailed(employees);
                taskResult.AddException(
                    new CallWebCreateFailedException(
                        $"CreateSurveys failed for a range of employees: {String.Join(", ", employees)}. Error: {exception.Message}"
                    )
                );
            }

            return taskResult;
        }

        public async Task<TaskResult<Employee>> UpdateSurveys(List<Employee> employees)
        {
            var taskResult = new TaskResult<Employee>();

            try
            {
                var callWebPatchDtos = employees
                    .Select(e => CallWebPatchDto.FromEmployee(e))
                    .ToList();
                var results = (await CallWebApi.PatchMultiple(callWebPatchDtos)).ToList();

                foreach (var employee in employees)
                {
                    var result = results.Find(result => employee.Telkey.Equals(result.Telkey));

                    if (result == null)
                    {
                        taskResult.AddFailedWithException(
                            employee,
                            new CallWebUpdateFailedException(
                                $"No UpdateSurveys result for {employee}"
                            )
                        );
                    }
                    else
                    {
                        taskResult.AddSucceeded(employee);
                    }
                }
            }
            catch (Exception exception)
            {
                // Assume the entire operation failed.
                taskResult.AddFailed(employees);
                taskResult.AddException(
                    new CallWebUpdateFailedException(
                        $"UpdateSurveys failed for a range of employees: {String.Join(", ", employees)}. Error: {exception.Message}"
                    )
                );
            }

            return taskResult;
        }

        public async Task<CallWebRowDto[]> ListAll()
        {
            var response = await CallWebApi.GetAll();

            return response;
        }
    }
}
