using Microsoft.Extensions.Options;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Services.PsaApi
{
    public class PsaApiService
    {
        private PsaApi PsaApi;
        private LoggingService logger;
        private EmailService emailService;

        public PsaApiService(
            IOptions<PsaApiServiceOptions> options,
            IHttpClientFactory clientFactory,
            LoggingService logger,
            EmailService emailService
        )
        {
            PsaApi = new PsaApi(
                options.Value.EsaDataUrl,
                options.Value.ClientUsername,
                options.Value.ClientPassword,
                clientFactory
            );
            this.logger = logger;
            this.emailService = emailService;
        }

        public async Task<EmployeeTaskResult> GetCurrent()
        {
            var taskResult = await PsaApi.GetAllEmployees(logger);

            await logger.LogEmployeeTaskResult(taskResult);

            // Send email on best effort basis
            emailService.SendTaskResultEmail(taskResult);

            return taskResult;
        }
    }
}
