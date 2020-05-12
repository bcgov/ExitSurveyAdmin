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
    public class CsvExtractController : ControllerBase
    {
        private readonly ExitSurveyAdminContext Context;
        private readonly CsvService Csv;
        private readonly EmployeeReconciliationService EmployeeReconciler;

        public CsvExtractController(
            ExitSurveyAdminContext context,
            CsvService csv,
            EmployeeReconciliationService employeeReconciler
        )
        {
            Context = context;
            Csv = csv;
            EmployeeReconciler = employeeReconciler;
        }

        // GetCsv: Returns the raw, as-is text of the PSA Csv extract.
        // GET: api/CsvExtract/Csv
        [HttpGet("Csv")]
        public async Task<ActionResult<string>> GetCsv()
        {
            string text = await Csv.ReadCsv();

            return Content(text);
        }

        // GetCsv: Given the raw text of the PSA Csv extract (as obtained, for
        // instance, from the GetCsv method), transform it into an array of
        // nicely-formatted Employee JSON objects, then reconcile each of those
        // Employees.
        // POST: api/CsvExtract/EmployeesFromCsv
        [HttpPost("EmployeesFromCsv")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCsv()
        {
            var reconciledEmployeeList = new List<Employee>();

            // TODO: Break apart this functionality.
            try
            {
                // Step 1. Get a list of candidate Employee objects based on the
                // Csv.
                var csvServiceTuple = await Csv
                    .EmployeesFromCsv(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                // Step 2. Reconcile the employees with the database.
                reconciledEmployeeList = await EmployeeReconciler
                    .ReconcileEmployees(Context, goodRecords);

                if (goodRecords.Count == totalRecordCount)
                {
                    await LoggingService.LogSuccess(Context, TaskEnum.ReconcileCsv,
                        $"From a list of {goodRecords.Count} records, " +
                        $"reconciled {reconciledEmployeeList.Count} employees."
                    );
                }
                else
                {
                    await LoggingService.LogWarning(Context, TaskEnum.ReconcileCsv,
                        $"From a list of {totalRecordCount} records, " +
                        $"reconciled {reconciledEmployeeList.Count} employees. " +
                        $"However, there were {badRecords.Count} bad records " +
                        $"encountered: {string.Join(';', badRecords)}"
                    );
                }

                // Step 3. Update existing user statues.
                // TODO: What if a user re-appears in the Csv after having been
                // marked as exiting?
                var nonFinalEmployees = Context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                    .ToList();

                foreach (Employee e in nonFinalEmployees)
                {
                    var employee = await EmployeeReconciler
                        .UpdateEmployeeStatus(Context, e);
                }

                // Step 3. For all ACTIVE users in the DB who are NOT in the
                // Csv, set them to exiting.
                var activeDBEmployeesNotInCsv = Context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                    .ToList()
                    .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                    .ToList();

                foreach (Employee e in activeDBEmployeesNotInCsv)
                {
                    var employee = await EmployeeReconciler
                        .SaveStatusAndAddTimelineEntry(
                            Context, e, EmployeeStatusEnum.NotExiting
                        );
                }
            }
            catch (Exception e)
            {
                await LoggingService.LogFailure(Context, TaskEnum.ReconcileCsv,
                    $"Error reconciling employee records. Stacktrace:\r\n" +
                    e.StackTrace
                );
            }

            return Ok(reconciledEmployeeList);
        }
    }
}
