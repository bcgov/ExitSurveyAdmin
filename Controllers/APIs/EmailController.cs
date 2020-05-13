using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Mvc;

namespace ExitSurveyAdmin.Controllers
{
    public class EmailDto
    {
        public string ToName { get; set; }
        public string ToAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        public override string ToString()
        {
            return $"To: {ToName} <{ToAddress}>\r\nSubject: {Subject}\r\n{Body}";
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ExitSurveyAdminContext Context;
        public EmailController(ExitSurveyAdminContext context)
        {
            Context = context;
        }

        /// <summary>Sends an email.
        /// <example>The body of the POST should be a JSON object:
        /// <code>
        /// {
        ///    "toName": "Alice",
        ///    "toAddress": "alice@domain.com",
        ///    "subject": "Subject of the email",
        ///    "body": "Email body."
        /// }
        /// </code>
        /// </example>
        /// </summary>
        /// GET: api/Email/Send
        [HttpPost("Send")]
        public ActionResult<string> Send(EmailDto emailDto)
        {
            // TODO: Validation

            // EmailService.SendEmail(
            //     this._appConfiguration,
            //     emailDto.ToName,
            //     emailDto.ToAddress,
            //     emailDto.Subject,
            //     emailDto.Body
            // );

            return Content(emailDto.ToString());
        }
    }
}
