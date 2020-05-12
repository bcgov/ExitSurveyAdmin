using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    public class EmailDto
    ***REMOVED***
        public string ToName ***REMOVED*** get; set; ***REMOVED***
        public string ToAddress ***REMOVED*** get; set; ***REMOVED***
        public string Subject ***REMOVED*** get; set; ***REMOVED***
        public string Body ***REMOVED*** get; set; ***REMOVED***

        public override string ToString()
        ***REMOVED***
            return $"To: ***REMOVED***ToName***REMOVED*** <***REMOVED***ToAddress***REMOVED***>\r\nSubject: ***REMOVED***Subject***REMOVED***\r\n***REMOVED***Body***REMOVED***";
      ***REMOVED***
  ***REMOVED***

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext Context;
        public EmailController(ExitSurveyAdminContext context)
        ***REMOVED***
            Context = context;
      ***REMOVED***

        /// <summary>Sends an email.
        /// <example>The body of the POST should be a JSON object:
        /// <code>
        /// ***REMOVED***
        ///    "toName": "Alice",
        ///    "toAddress": "alice@domain.com",
        ///    "subject": "Subject of the email",
        ///    "body": "Email body."
        /// ***REMOVED***
        /// </code>
        /// </example>
        /// </summary>
        /// GET: api/Email/Send
        [HttpPost("Send")]
        public ActionResult<string> Send(EmailDto emailDto)
        ***REMOVED***
            // TODO: Validation

            // EmailService.SendEmail(
            //     this._appConfiguration,
            //     emailDto.ToName,
            //     emailDto.ToAddress,
            //     emailDto.Subject,
            //     emailDto.Body
            // );

            return Content(emailDto.ToString());
      ***REMOVED***
  ***REMOVED***
***REMOVED***
