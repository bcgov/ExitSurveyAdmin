using System.Globalization;
using System.Text;
using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using System.Net.Http;
using Microsoft.VisualBasic.FileIO;
using CsvHelper;
using ExitSurveyAdmin.Services;

namespace ExitSurveyAdmin.Controllers
{
    public class EmailDTO
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
        private readonly ExitSurveyAdminContext _context;
        private readonly AppConfiguration _appConfiguration;

        public EmailController(ExitSurveyAdminContext context, AppConfiguration appConfiguration)
        {
            _context = context;
            _appConfiguration = appConfiguration;
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
        public async Task<ActionResult<string>> Send(EmailDTO emailDTO)
        {
            // TODO: Validation

            // EmailService.SendEmail(
            //     this._appConfiguration,
            //     emailDTO.ToName,
            //     emailDTO.ToAddress,
            //     emailDTO.Subject,
            //     emailDTO.Body
            // );

            return Content(emailDTO.ToString());
        }
    }
}
