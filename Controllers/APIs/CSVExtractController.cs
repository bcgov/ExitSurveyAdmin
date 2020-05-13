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
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class CsvExtractController : ControllerBase
    ***REMOVED***
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
        ***REMOVED***
            this.context = context;
            this.csv = csv;
            this.employeeReconciler = employeeReconciler;
            this.logger = logger;
      ***REMOVED***

        // GetCsv: Returns the raw, as-is text of the PSA Csv extract.
        // GET: api/CsvExtract/Csv
        [HttpGet("Csv")]
        public async Task<ActionResult<string>> GetCsv()
        ***REMOVED***
            string text = await csv.ReadCsv();

            return Content(text);
      ***REMOVED***

        // GetCsv: Given the raw text of the PSA Csv extract (as obtained, for
        // instance, from the GetCsv method), transform it into an array of
        // nicely-formatted Employee JSON objects, then reconcile each of those
        // Employees.
        // POST: api/CsvExtract/EmployeesFromCsv
        [HttpPost("EmployeesFromCsv")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCsv()
        ***REMOVED***
            var reconciledEmployeeList = new List<Employee>();

            // TODO: Break apart this functionality.
            try
            ***REMOVED***
                // Step 1. Get a list of candidate Employee objects based on the
                // Csv.
                var csvServiceTuple = await csv
                    .EmployeesFromCsv(Request.Body, Encoding.UTF8);
                var goodRecords = csvServiceTuple.Item1;
                var badRecords = csvServiceTuple.Item2;
                var totalRecordCount = goodRecords.Count + badRecords.Count;

                // Step 2. Reconcile the employees with the database.
                reconciledEmployeeList = await employeeReconciler
                    .ReconcileEmployees(goodRecords);

                if (goodRecords.Count == totalRecordCount)
                ***REMOVED***
                    await logger.LogSuccess(TaskEnum.ReconcileCsv,
                        $"From a list of ***REMOVED***goodRecords.Count***REMOVED*** records, " +
                        $"reconciled ***REMOVED***reconciledEmployeeList.Count***REMOVED*** employees."
                    );
              ***REMOVED***
                else
                ***REMOVED***
                    await logger.LogWarning(TaskEnum.ReconcileCsv,
                        $"From a list of ***REMOVED***totalRecordCount***REMOVED*** records, " +
                        $"reconciled ***REMOVED***reconciledEmployeeList.Count***REMOVED*** employees. " +
                        $"However, there were ***REMOVED***badRecords.Count***REMOVED*** bad records " +
                        $"encountered: ***REMOVED***string.Join(';', badRecords)***REMOVED***"
                    );
              ***REMOVED***

                // Step 3. Update existing user statues.
                // TODO: What if a user re-appears in the Csv after having been
                // marked as exiting?
                var nonFinalEmployees = context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal)
                    .ToList();

                foreach (Employee e in nonFinalEmployees)
                ***REMOVED***
                    var employee = await employeeReconciler
                        .UpdateEmployeeStatus(e);
              ***REMOVED***

                // Step 3. For all ACTIVE users in the DB who are NOT in the
                // Csv, set them to exiting.
                var activeDBEmployeesNotInCsv = context.Employees
                    .Include(e => e.TimelineEntries)
                    .Include(e => e.CurrentEmployeeStatus)
                    .Where(e => e.CurrentEmployeeStatus.State != EmployeeStatusEnum.StateFinal) // Reproject this as the status might have changed
                    .Where(e => reconciledEmployeeList.All(e2 => e2.Id != e.Id)) // This finds all nonFinalEmployees whose Id is not in the reconciledEmployeeList
                    .ToList();

                foreach (Employee e in activeDBEmployeesNotInCsv)
                ***REMOVED***
                    var employee = await employeeReconciler
                        .SaveStatusAndAddTimelineEntry(
                            e, EmployeeStatusEnum.NotExiting
                        );
              ***REMOVED***
          ***REMOVED***
            catch (Exception e)
            ***REMOVED***
                await logger.LogFailure(TaskEnum.ReconcileCsv,
                    $"Error reconciling employee records. Stacktrace:\r\n" +
                    e.StackTrace
                );
          ***REMOVED***

            return Ok(reconciledEmployeeList);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
