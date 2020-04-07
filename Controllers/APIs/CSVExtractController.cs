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

        public CSVExtractController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        {
            string text = await CSVExtractService
                .GetCSV("./SampleInput/PSA-CSV-Sample.csv");

            return Content(text);
        }

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects. Note that these Employees are
        // NOT saved or otherwise processed by default.
        // POST: api/CSVExtract/EmployeesFromCSV
        [HttpPost("EmployeesFromCSV")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        {
            var employeeList = await CSVExtractService
                .EmployeesFromCSV(Request.Body, Encoding.UTF8);

            return employeeList;
        }

        [HttpPut("ReconcileEmployee/{id}")]
        public async Task<ActionResult<Employee>> ReconcileEmployee(int id, Employee employee)
        {
            // Reconciliation logic here.

            // if (id != employee.Id)
            // {
            //     return BadRequest();
            // }

            // if (Employee)

            // _context.Entry(employee).State = EntityState.Modified;

            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!EmployeeExists(employee))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }
            var newEmployee = await EmployeeReconciliationService
                .ReconcileEmployee(_context, employee);

            return newEmployee;
        }


    }
}
