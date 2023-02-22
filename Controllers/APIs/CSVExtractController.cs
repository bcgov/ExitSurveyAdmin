using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using ExitSurveyAdmin.Services.CsvService;
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

        // GetCsv: Given the raw text of the PSA Csv extract, transform it into
        // an array of nicely-formatted Employee JSON objects, then reconcile
        // each of those Employees.
        // POST: api/CsvExtract/EmployeesFromCsv
        [HttpPost("EmployeesFromCsv")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCsv()
        {
            try
            {
                // Get a list of candidate Employee objects based on the CSV.
                var readResult = await csv.ProcessCsvAndLog(Request);

                // Reconcile the employees with the database.
                var taskResult = await employeeReconciler.ReconcileEmployeesAndLog(
                    TaskEnum.LoadFromCsv,
                    readResult.GoodEmployees
                );
                return Ok(taskResult.GoodEmployees);
            }
            catch (Exception e)
            {
                return await ApiResponseHelper.LogFailureAndSendStacktrace(
                    this,
                    TaskEnum.LoadFromCsv,
                    e,
                    logger
                );
            }

            // var reconciledEmployeeList = new List<Employee>();

            // try
            // {
            //     // Step 1. Update existing employee statuses.
            //     await employeeReconciler.UpdateEmployeeStatuses();

            //     // Step 2. Get a list of candidate Employee objects based on the
            //     // Csv.
            //     reconciledEmployeeList = await csv.ProcessCsv(Request, employeeReconciler, logger);

            //     // Step 3. Update existing employee statuses, again.
            //     await employeeReconciler.UpdateEmployeeStatuses();

            //     // Step 4. For all ACTIVE users in the DB who are NOT in the
            //     // Csv, set them to not exiting, IF they are not in a final state.
            //     // Including updating Callweb.
            //     await employeeReconciler.UpdateNotExiting(reconciledEmployeeList);
            // }
            // catch (Exception e)
            // {
            //     await logger.LogFailure(
            //         TaskEnum.ReconcileCsv,
            //         $"Error reconciling employee records. Stacktrace:\r\n" + e.StackTrace
            //     );
            // }

            // return Ok(reconciledEmployeeList);
        }
    }
}
