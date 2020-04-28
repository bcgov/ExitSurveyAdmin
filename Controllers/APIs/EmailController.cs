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
***REMOVED***
    public class EmailDTO
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
        private readonly ExitSurveyAdminContext _context;
        private readonly AppConfiguration _appConfiguration;

        public EmailController(ExitSurveyAdminContext context, AppConfiguration appConfiguration)
        ***REMOVED***
            _context = context;
            _appConfiguration = appConfiguration;
      ***REMOVED***

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/Email/Send
        [HttpPost("Send")]
        public async Task<ActionResult<string>> Send(EmailDTO emailDTO)
        ***REMOVED***
            // TODO: Validation

            // EmailService.SendEmail(
            //     this._appConfiguration,
            //     emailDTO.ToName,
            //     emailDTO.ToAddress,
            //     emailDTO.Subject,
            //     emailDTO.Body
            // );

            return Content(emailDTO.ToString());
      ***REMOVED***
  ***REMOVED***
***REMOVED***
