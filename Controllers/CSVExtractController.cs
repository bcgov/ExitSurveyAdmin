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

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class CSVExtractController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;

        public CSVExtractController(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        ***REMOVED***
            string text = await System.IO.File
                .ReadAllTextAsync("./SampleInput/PSA-CSV-Sample.csv");

            return Content(text);
      ***REMOVED***

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects. Note that these Employees are
        // NOT saved or otherwise processed by default.
        // POST: api/CSVExtract/EmployeesFromCSV
        [HttpPost("EmployeesFromCSV")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        ***REMOVED***
            // By default the content will not be read if it is not form or JSON
            // type so we need to use a stream reader to read the request body.
            // CsvReader expects a StreamReader anyways so we will use that.
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            ***REMOVED***
                // Use the ClassMap to map the headers in the CSV to the fields
                // of the Employee model.
                csv.Configuration.RegisterClassMap<PSACSVMap>();

                var employeeList = new List<Employee>();

                await foreach (Employee e in csv.GetRecordsAsync<Employee>())
                ***REMOVED***
                    employeeList.Add(e);
              ***REMOVED***

                return employeeList;
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***
