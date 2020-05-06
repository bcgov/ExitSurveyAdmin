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
    public class CSVExtractController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;
        private readonly AppConfiguration _myConfiguration;

        public CSVExtractController(ExitSurveyAdminContext context, AppConfiguration myConfiguration)
        {
            _context = context;
            _myConfiguration = myConfiguration;
        }

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        {
            string text = await CSVService
                .ReadCSV(_myConfiguration.SamplePSACSVFilePath);

            return Content(text);
        }

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects, then reconcile each of those
        // Employees.
        // POST: api/CSVExtract/EmployeesFromCSV
        [HttpPost("EmployeesFromCSV")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        {
            var reconciledEmployeeList = new List<Employee>();

            try
            {
                // Get a list of candidate Employee objects based on the CSV.
                var csvServiceTuple = await CSVService
                    .EmployeesFromCSV(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                foreach (Employee e in goodRecords)
                {
                    var employee = await EmployeeReconciliationService
                        .ReconcileEmployee(_context, e);
                    reconciledEmployeeList.Add(employee);
                }

                if (goodRecords.Count == totalRecordCount)
                {
                    await LoggingService.LogSuccess(_context, TaskEnum.ReconcileCSV,
                        $"From a list of {goodRecords.Count} records, " +
                        $"reconciled {reconciledEmployeeList.Count} employees."
                    );
                }
                else
                {
                    await LoggingService.LogWarning(_context, TaskEnum.ReconcileCSV,
                        $"From a list of {totalRecordCount} records, " +
                        $"reconciled {reconciledEmployeeList.Count} employees. " +
                        $"However, there were {badRecords.Count} bad records " +
                        $"encountered: {string.Join(';', badRecords)}"
                    );
                }
            }
            catch (Exception e)
            {
                await LoggingService.LogFailure(_context, TaskEnum.ReconcileCSV,
                    $"Error reconciling employee records. Stacktrace:\r\n" +
                    e.StackTrace
                );
            }

            return reconciledEmployeeList;
        }

        [HttpPost("ReconcileEmployees")]
        public async Task<ActionResult<List<Employee>>> ReconcileEmployees(List<Employee> employeeJSON)
        {
            var employees = new List<Employee>();

            Console.WriteLine(employeeJSON);

            return employees;
        }
    }
}
