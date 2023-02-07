using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CallWeb;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class HealthStatusController : ControllerBase
    ***REMOVED***
        private readonly CallWebService callWebService;
        private readonly EmailService emailService;

        public HealthStatusController(CallWebService callWebService, EmailService emailService)
        ***REMOVED***
            this.callWebService = callWebService;
            this.emailService = emailService;
      ***REMOVED***

        // GetStatus: Returns "Healthy." if the API is healthy.
        // GET: api/HealthStatus/Status
        [HttpGet("Status")]
        public ActionResult<string> GetStatus()
        ***REMOVED***
            string text = "***REMOVED*** \"msg\": \"Healthy.\" ***REMOVED***";

            return Ok(text);
      ***REMOVED***

        // GetCallWebCount: Returns the count of records in CallWeb, if that API
        // is working, or -1 if there has been an error.
        // GET: api/HealthStatus/CallWebCount
        [HttpGet("CallWebCount")]
        public async Task<ActionResult<string>> GetCallWebCount()
        ***REMOVED***
            var apiServiceCallResult = await this.callWebService.ListAll();

            int length = apiServiceCallResult == null ? -1 : apiServiceCallResult.Length;

            string text = "***REMOVED*** \"callWebRecordCount\": \"" + length + "\" ***REMOVED***";

            return Ok(text);
      ***REMOVED***

        [HttpGet("SendEmail")]
        public async Task<ActionResult<string>> SendEmail()
        ***REMOVED***
            await emailService.SendTestEmail("Test subject", "Test body");

            return Ok();
      ***REMOVED***
  ***REMOVED***
***REMOVED***
