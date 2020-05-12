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
    [Route("api/[controller]")]
    [ApiController]
    public class CallWebController : ControllerBase
    {
        private readonly ExitSurveyAdminContext Context;
        private readonly CsvService Csv;

        public CallWebController(
            ExitSurveyAdminContext context, CsvService csv
        )
        {
            Context = context;
            Csv = csv;
        }

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CallWeb/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        {
            string text = await Csv.ReadCsv();

            return Content(text);
        }

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects. Note that these Employees are
        // NOT saved or otherwise processed by default.
        // POST: api/CSVExtract/EmployeesFromCSV
        // [HttpPost("EmployeesFromCSV")]
        // public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        // {
        //     // Get a list of candidate Employee objects based on the CSV.
        //     var csvEmployeeList = await CSVService
        //         .EmployeesFromCSV(Request.Body, Encoding.UTF8);

        //     return csvEmployeeList;
        // }
    }
}
