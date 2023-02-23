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
