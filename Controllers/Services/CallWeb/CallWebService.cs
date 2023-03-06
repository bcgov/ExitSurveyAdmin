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
        public async Task<List<Tuple<EmployeeResult, string>>> GetSurveyStatusCodes(
            List<Employee> employees
        )
        {
            var telkeys = employees.Select(e => e.Telkey).ToArray();

            if (telkeys.Count() != employees.Count())
            {
                throw new Exception("telkeys.Count != employees.Count!");
            }

            var callWebDtos = (await CallWebApi.GetMultiple(telkeys)).ToList();

            var results = new List<Tuple<EmployeeResult, string>>();

            foreach (var e in employees)
            {
                var callWebDto = callWebDtos.Find(dto => dto.Telkey == e.Telkey);
                var employeeResult = new EmployeeResult(e);
                string statusCode = null;

                if (callWebDto == null)
                {
                    employeeResult.AddException(new CallWebRetrieveFailedException());
                }
                else
                {
                    statusCode =
                        (IsSurveyComplete(callWebDto))
                            ? EmployeeStatusEnum.SurveyComplete.Code
                            : callWebDto.CurrentStatus;
                }
                results.Add(Tuple.Create(employeeResult, statusCode));
            }

            return results;
        }

        private bool IsSurveyComplete(CallWebRowDto callWebDto)
        {
            return callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1");
        }

        public async Task<List<EmployeeResult>> CreateSurveys(List<Employee> employees)
        {
            var callWebPostDtos = employees.Select(e => CallWebPostDto.FromEmployee(e)).ToList();
            var results = (await CallWebApi.PostMultiple(callWebPostDtos)).ToList();

            var employeeResults = employees
                .Select(employee =>
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
                        return new EmployeeResult(
                            employee,
                            new CallWebCreateFailedException(
                                "Employee not present in CreateSurveys result."
                            )
                        );
                    }
                    else
                    {
                        employee.Telkey = result.Telkey;
                        return new EmployeeResult(employee);
                    }
                })
                .ToList();

            return employeeResults;
        }

        public async Task<List<EmployeeResult>> UpdateSurveys(List<Employee> employees)
        {
            var callWebPatchDtos = employees.Select(e => CallWebPatchDto.FromEmployee(e)).ToList();
            var results = (await CallWebApi.PatchMultiple(callWebPatchDtos)).ToList();

            var employeeResults = employees
                .Select(employee =>
                {
                    var result = results.Find(result => employee.Telkey.Equals(result.Telkey));

                    if (result == null)
                    {
                        return new EmployeeResult(
                            employee,
                            new CallWebUpdateFailedException(
                                "Employee not present in UpdateSurveys result."
                            )
                        );
                    }
                    else
                    {
                        return new EmployeeResult(employee);
                    }
                })
                .ToList();

            return employeeResults;
        }

        public async Task<CallWebRowDto[]> ListAll()
        {
            var response = await CallWebApi.GetAll();

            return response;
        }
    }
}
