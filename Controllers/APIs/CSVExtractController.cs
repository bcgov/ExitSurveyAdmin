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
        // nicely-formatted Employee JSON objects, then reconcile each of those
        // Employees.
        // POST: api/CSVExtract/EmployeesFromCSV
        [HttpPost("EmployeesFromCSV")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        ***REMOVED***
            var reconciledEmployeeList = new List<Employee>();

            try
            ***REMOVED***
                // Get a list of candidate Employee objects based on the CSV.
                var csvServiceTuple = await CSVService
                    .EmployeesFromCSV(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                reconciledEmployeeList = await EmployeeReconciliationService
                    .ReconcileEmployees(_context, goodRecords);

                if (goodRecords.Count == totalRecordCount)
                ***REMOVED***
                    await LoggingService.LogSuccess(_context, TaskEnum.ReconcileCSV,
                        $"From a list of ***REMOVED***goodRecords.Count***REMOVED*** records, " +
                        $"reconciled ***REMOVED***reconciledEmployeeList.Count***REMOVED*** employees."
                    );
              ***REMOVED***
                else
                ***REMOVED***
                    await LoggingService.LogWarning(_context, TaskEnum.ReconcileCSV,
                        $"From a list of ***REMOVED***totalRecordCount***REMOVED*** records, " +
                        $"reconciled ***REMOVED***reconciledEmployeeList.Count***REMOVED*** employees. " +
                        $"However, there were ***REMOVED***badRecords.Count***REMOVED*** bad records " +
                        $"encountered: ***REMOVED***string.Join(';', badRecords)***REMOVED***"
                    );
              ***REMOVED***
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                await LoggingService.LogFailure(_context, TaskEnum.ReconcileCSV,
                    $"Error reconciling employee records. Stacktrace:\r\n" +
                    e.StackTrace
                );
          ***REMOVED***

            return reconciledEmployeeList;
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
