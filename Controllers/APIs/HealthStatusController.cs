using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthStatusController : ControllerBase
    {
        private readonly CallWebService callWebService;
        private readonly EmailService emailService;

        public HealthStatusController(CallWebService callWebService, EmailService emailService)
        {
            this.callWebService = callWebService;
            this.emailService = emailService;
        }

        // GetStatus: Returns "Healthy." if the API is healthy.
        // GET: api/HealthStatus/Status
        [HttpGet("Status")]
        public ActionResult<string> GetStatus()
        {
            string text = "{ \"msg\": \"Healthy.\" }";

            return Ok(text);
        }

        // GetCallWebCount: Returns the count of records in CallWeb, if that API
        // is working, or -1 if there has been an error.
        // GET: api/HealthStatus/CallWebCount
        [HttpGet("CallWebCount")]
        public async Task<ActionResult<string>> GetCallWebCount()
        {
            var apiServiceCallResult = await this.callWebService.ListAll();

            int length = apiServiceCallResult == null ? -1 : apiServiceCallResult.Length;

            string text = "{ \"callWebRecordCount\": \"" + length + "\" }";

            return Ok(text);
        }

        [HttpGet("SendEmail")]
        public async Task<ActionResult<string>> SendEmail()
        {
            await emailService.SendTestEmail("Test subject", "Test body");

            return Ok();
        }
    }
}
