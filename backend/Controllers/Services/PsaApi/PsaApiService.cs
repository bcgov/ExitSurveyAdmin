using Microsoft.Extensions.Options;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.PsaApi
***REMOVED***
    public class PsaApiService
    ***REMOVED***
        private PsaApi PsaApi;
        private LoggingService logger;
        private EmailService emailService;

        public PsaApiService(
            IOptions<PsaApiServiceOptions> options,
            IHttpClientFactory clientFactory,
            LoggingService logger,
            EmailService emailService
        )
        ***REMOVED***
            PsaApi = new PsaApi(
                options.Value.EsaDataUrl,
                options.Value.ClientUsername,
                options.Value.ClientPassword,
                clientFactory
            );
            this.logger = logger;
            this.emailService = emailService;
      ***REMOVED***

        public async Task<EmployeeTaskResult> GetCurrent()
        ***REMOVED***
            var taskResult = await PsaApi.GetAllEmployees(logger);

            await logger.LogEmployeeTaskResult(taskResult);

            // Send email on best effort basis
            emailService.SendTaskResultEmail(taskResult);

            return taskResult;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
