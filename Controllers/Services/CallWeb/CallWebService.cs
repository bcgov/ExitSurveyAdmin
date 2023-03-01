using System;
using System.Linq;
using ExitSurveyAdmin.Models;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

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

        // Determines whether a survey is complete, given an employee.
        // public async Task<string> GetSurveyStatusCode(Employee employee)
        // ***REMOVED***
        //     var callWebDto = await CallWebApi.GetOne(employee.Telkey);

        //     if (callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1"))
        //     ***REMOVED***
        //         return EmployeeStatusEnum.SurveyComplete.Code;
        //   ***REMOVED***

        //     return callWebDto.CurrentStatus;
        // ***REMOVED***

        // Determines whether a survey is complete, given multiple employees.
        public async Task<List<Tuple<Employee, string>>> GetSurveyStatusCodes(
            IEnumerable<Employee> employees
        )
        ***REMOVED***
            var telkeys = employees.Select(e => e.Telkey).ToArray();

            if (telkeys.Count() != employees.Count())
            ***REMOVED***
                throw new Exception("telkeys.Count != employees.Count!");
          ***REMOVED***

            var callWebDtos = (await CallWebApi.GetMultiple(telkeys)).ToList();

            var statusCodes = new List<Tuple<Employee, string>>();

            foreach (var e in employees)
            ***REMOVED***
                var callWebDto = callWebDtos.Find(dto => dto.Telkey == e.Telkey);

                if (callWebDto == null)
                ***REMOVED***
                    statusCodes.Add(Tuple.Create(e, ""));
              ***REMOVED***
                else
                ***REMOVED***
                    if (
                        callWebDto.IsSurveyComplete != null
                        && callWebDto.IsSurveyComplete.Equals("1")
                    )
                    ***REMOVED***
                        statusCodes.Add(Tuple.Create(e, EmployeeStatusEnum.SurveyComplete.Code));
                  ***REMOVED***
                    else
                    ***REMOVED***
                        statusCodes.Add(Tuple.Create(e, callWebDto.CurrentStatus));
                  ***REMOVED***
              ***REMOVED***
          ***REMOVED***

            return statusCodes;

            // if (callWebDto.IsSurveyComplete != null && callWebDto.IsSurveyComplete.Equals("1"))
            // ***REMOVED***
            //     return EmployeeStatusEnum.SurveyComplete.Code;
            // ***REMOVED***

            // return callWebDto.CurrentStatus;
      ***REMOVED***

        public async Task<CallWebRowDto[]> CreateSurveys(List<Employee> employees)
        ***REMOVED***
            var callWebPostDtos = employees.Select(e => CallWebPostDto.FromEmployee(e)).ToList();
            var results = await CallWebApi.PostMultiple(callWebPostDtos);

            // TODO: move this check elsewhere
            // if (string.IsNullOrEmpty(callWebDto.Telkey))
            // ***REMOVED***

            //     throw new InvalidOperationException("Telkey was not created.");
            // ***REMOVED***

            return results;
      ***REMOVED***

        // public async Task<CallWebRowDto> UpdateSurvey(Employee employee)
        // ***REMOVED***
        //     var callWebPatchDto = CallWebPatchDto.FromEmployee(employee);
        //     var callWebDto = await CallWebApi.Patch(callWebPatchDto);

        //     return callWebDto;
        // ***REMOVED***

        public async Task<CallWebRowDto[]> UpdateSurveys(List<Employee> employees)
        ***REMOVED***
            var callWebPatchDtos = employees.Select(e => CallWebPatchDto.FromEmployee(e)).ToList();
            var callWebDtos = await CallWebApi.PatchMultiple(callWebPatchDtos);

            return callWebDtos;
      ***REMOVED***

        public async Task<CallWebRowDto[]> ListAll()
        ***REMOVED***
            var response = await CallWebApi.GetAll();

            return response;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
