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

            try
            ***REMOVED***
                // Step 1. Update existing employee statuses.
                await employeeReconciler.UpdateEmployeeStatuses();

                // Step 2. Get a list of candidate Employee objects based on the
                // Csv.
                reconciledEmployeeList = await csv.ProcessCsv(Request, employeeReconciler, logger);

                // Step 3. For all ACTIVE users in the DB who are NOT in the
                // Csv, set them to not exiting, IF they are not in a final state.
                await employeeReconciler.UpdateNotExiting(reconciledEmployeeList);
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
