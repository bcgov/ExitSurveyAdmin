using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvExtractController : ControllerBase
    {
        private readonly ExitSurveyAdminContext context;
        private readonly CsvService csv;
        private readonly EmployeeReconciliationService employeeReconciler;
        private readonly LoggingService logger;

        public CsvExtractController(
            ExitSurveyAdminContext context,
            CsvService csv,
            EmployeeReconciliationService employeeReconciler,
            LoggingService logger
        )
        {
            this.context = context;
            this.csv = csv;
            this.employeeReconciler = employeeReconciler;
            this.logger = logger;
        }

        // GetCsv: Returns the raw, as-is text of the PSA Csv extract.
        // GET: api/CsvExtract/Csv
        [HttpGet("Csv")]
        public async Task<ActionResult<string>> GetCsv()
        {
            string text = await csv.ReadCsv();

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
                var csvServiceTuple = await csv
                    .EmployeesFromCsv(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                // Step 2. Reconcile the employees with the database.
                var reconcilerTuple = await employeeReconciler
                    .ReconcileEmployees(goodRecords);
                var goodEmployees = reconcilerTuple.Item1;
                var badEmployees = reconcilerTuple.Item2;
                var totalEmployeeCount = goodEmployees.Count + badEmployees.Count;
                reconciledEmployeeList = goodEmployees;

                if (
                    goodRecords.Count == totalRecordCount &&
                    goodEmployees.Count == totalRecordCount
                )
                {
                    // If there are no records, then this was an employee data
                    // refresh. Indicate as such.
                    var message = (totalRecordCount == 0)
                        ? "Refreshed employee data."
                        : $"From a CSV with {totalRecordCount} rows, " +
                          $"reconciled {totalRecordCount} employees. ";
                    await logger.LogSuccess(TaskEnum.ReconcileCsv, message);
                }
                else
                {
                    var newLine = System.Environment.NewLine;

                    var message =
                        $"From a CSV with {totalRecordCount} rows, " +
                        $"successfully read {goodRecords.Count} rows " +
                        $"and reconciled {goodEmployees.Count} employees. ";

                    if (goodRecords.Count != totalRecordCount)
                    {
                        message +=
                            $"There were {badRecords.Count} bad rows: " +
                            $"Exceptions: {string.Join(newLine, badRecords)} ";
                    }
                    if (goodEmployees.Count != goodRecords.Count)
                    {
                        message +=
                            $"There were {badEmployees.Count} employees with errors: " +
                            $"Exceptions: {string.Join(newLine, badEmployees)} ";
                    }
                    await logger.LogWarning(TaskEnum.ReconcileCsv, message);
                }

                // Step 3. Update existing user statuses.
                // TODO: What if a user re-appears in the Csv after having been
                // marked as exiting?
                var nonFinalEmployees = context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                    .ToList();

                foreach (Employee e in nonFinalEmployees)
                {
                    var employee = await employeeReconciler
                        .UpdateEmployeeStatus(e);
                }

                // Step 4. For all ACTIVE users in the DB who are NOT in the
                // Csv, set them to not exiting, IF they are not in a final state.
                var activeDBEmployeesNotInCsv = context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                    .ToList()
                    .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                    .ToList();

                foreach (Employee e in activeDBEmployeesNotInCsv)
                {
                    var employee = await employeeReconciler
                        .SaveStatusAndAddTimelineEntry(
                            e, EmployeeStatusEnum.NotExiting
                        );
                }
            }
            catch (Exception e)
            {
                await logger.LogFailure(TaskEnum.ReconcileCsv,
                    $"Error reconciling employee records. Stacktrace:\r\n" +
                    e.StackTrace
                );
            }

            return Ok(reconciledEmployeeList);
        }
    }
}
