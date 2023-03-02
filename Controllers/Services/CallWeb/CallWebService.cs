using System;
using System.Linq;
using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

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

        // Determines whether a survey is complete, given an employee.
        // public async Task<string> GetSurveyStatusCode(Employee employee)
        // {
        //     var callWebDto = await CallWebApi.GetOne(employee.Telkey);

        //     if (callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1"))
        //     {
        //         return EmployeeStatusEnum.SurveyComplete.Code;
        //     }

        //     return callWebDto.CurrentStatus;
        // }

        // Determines whether a survey is complete, given multiple employees.
        public async Task<List<Tuple<Employee, string>>> GetSurveyStatusCodes(
            IEnumerable<Employee> employees
        )
        {
            var telkeys = employees.Select(e => e.Telkey).ToArray();

            if (telkeys.Count() != employees.Count())
            {
                throw new Exception("telkeys.Count != employees.Count!");
            }

            var callWebDtos = (await CallWebApi.GetMultiple(telkeys)).ToList();

            var statusCodes = new List<Tuple<Employee, string>>();

            foreach (var e in employees)
            {
                var callWebDto = callWebDtos.Find(dto => dto.Telkey == e.Telkey);

                if (callWebDto == null)
                {
                    statusCodes.Add(Tuple.Create(e, ""));
                }
                else
                {
                    if (
                        callWebDto.IsSurveyComplete != null
                        && callWebDto.IsSurveyComplete.Equals("1")
                    )
                    {
                        statusCodes.Add(Tuple.Create(e, EmployeeStatusEnum.SurveyComplete.Code));
                    }
                    else
                    {
                        statusCodes.Add(Tuple.Create(e, callWebDto.CurrentStatus));
                    }
                }
            }

            return statusCodes;

            // if (callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1"))
            // {
            //     return EmployeeStatusEnum.SurveyComplete.Code;
            // }

            // return callWebDto.CurrentStatus;
        }

        public async Task<CallWebRowDto[]> CreateSurveys(IEnumerable<Employee> employees)
        {
            var callWebPostDtos = employees.Select(e => CallWebPostDto.FromEmployee(e)).ToList();
            var results = await CallWebApi.PostMultiple(callWebPostDtos);

            // TODO: move this check elsewhere
            // if (string.IsNullOrEmpty(callWebDto.Telkey))
            // {

            //     throw new InvalidOperationException("Telkey was not created.");
            // }

            return results;
        }

        // public async Task<CallWebRowDto> UpdateSurvey(Employee employee)
        // {
        //     var callWebPatchDto = CallWebPatchDto.FromEmployee(employee);
        //     var callWebDto = await CallWebApi.Patch(callWebPatchDto);

        //     return callWebDto;
        // }

        public async Task<CallWebRowDto[]> UpdateSurveys(List<Employee> employees)
        {
            var callWebPatchDtos = employees.Select(e => CallWebPatchDto.FromEmployee(e)).ToList();
            var callWebDtos = await CallWebApi.PatchMultiple(callWebPatchDtos);

            return callWebDtos;
        }

        public async Task<CallWebRowDto[]> ListAll()
        {
            var response = await CallWebApi.GetAll();

            return response;
        }
    }
}
