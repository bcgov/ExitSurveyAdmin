using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CSVExtractController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;

        public CSVExtractController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public ActionResult<string> GetCSV()
        {
            return Content("Test");
        }
    }
}
