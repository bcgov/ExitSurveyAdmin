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
    [Route("api/[controller]")]
    [ApiController]
    public class CSVExtractController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;
        private readonly AppConfiguration _myConfiguration;

        public CSVExtractController(ExitSurveyAdminContext context, AppConfiguration myConfiguration)
        ***REMOVED***
            _context = context;
            _myConfiguration = myConfiguration;
      ***REMOVED***

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        ***REMOVED***
            string text = await CSVService
                .ReadCSV(_myConfiguration.SamplePSACSVFilePath);

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
            // Get a list of candidate Employee objects based on the CSV.
            var csvEmployeeList = await CSVService
                .EmployeesFromCSV(Request.Body, Encoding.UTF8);

            foreach (Employee e in csvEmployeeList)
            ***REMOVED***
                Console.WriteLine(e.FullName);
                var employee = await EmployeeReconciliationService
                    .ReconcileEmployee(_context, e);
          ***REMOVED***

            return csvEmployeeList;
      ***REMOVED***

        [HttpPost("ReconcileEmployees")]
        public async Task<ActionResult<List<Employee>>> ReconcileEmployees(List<Employee> employeeJSON)
        ***REMOVED***
            var employees = new List<Employee>();

            Console.WriteLine(employeeJSON);

            return employees;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
