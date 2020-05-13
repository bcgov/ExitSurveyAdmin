using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallWebController : ControllerBase
    {
        private readonly ExitSurveyAdminContext Context;
        private readonly CsvService Csv;

        public CallWebController(
            ExitSurveyAdminContext context, CsvService csv
        )
        {
            Context = context;
            Csv = csv;
        }

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CallWeb/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        {
            string text = await Csv.ReadCsv();

            return Content(text);
        }

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects. Note that these Employees are
        // NOT saved or otherwise processed by default.
        // POST: api/CSVExtract/EmployeesFromCSV
        // [HttpPost("EmployeesFromCSV")]
        // public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        // {
        //     // Get a list of candidate Employee objects based on the CSV.
        //     var csvEmployeeList = await CSVService
        //         .EmployeesFromCSV(Request.Body, Encoding.UTF8);

        //     return csvEmployeeList;
        // }
    }
}
