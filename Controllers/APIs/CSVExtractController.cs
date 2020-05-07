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

            // TODO: Break apart this functionality.
            try
            {
                // Step 1. Get a list of candidate Employee objects based on the
                // CSV.
                var csvServiceTuple = await CSVService
                    .EmployeesFromCSV(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                // Step 2. Reconcile the employees with the database.
                reconciledEmployeeList = await EmployeeReconciliationService
                    .ReconcileEmployees(_context, goodRecords);

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

                // Step 3. Update existing user statues.
                // TODO: What if a user re-appears in the CSV after having been
                // marked as exiting?
                var nonFinalEmployees = _context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                    .ToList();

                foreach (Employee e in nonFinalEmployees)
                {
                    var employee = await EmployeeReconciliationService
                        .UpdateEmployeeStatus(_context, e);
                }

                // Step 3. For all ACTIVE users in the DB who are NOT in the
                // CSV, set them to exiting.
                var activeDBEmployeesNotInCSV = nonFinalEmployees
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed

                    .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                    .ToList();

                foreach (Employee e in activeDBEmployeesNotInCSV)
                {
                    var employee = await EmployeeReconciliationService
                        .SaveStatusAndAddTimelineEntry(
                            _context, e, EmployeeStatusEnum.NotExiting
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
