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
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class CSVExtractController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;

        public CSVExtractController(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        // GetCSV: Returns the raw, as-is text of the PSA CSV extract.
        // GET: api/CSVExtract/CSV
        [HttpGet("CSV")]
        public async Task<ActionResult<string>> GetCSV()
        ***REMOVED***
            string text = await CSVExtractService
                .GetCSV("./SampleInput/PSA-CSV-Sample.csv");

            return Content(text);
      ***REMOVED***

        // GetCSV: Given the raw text of the PSA CSV extract (as obtained, for
        // instance, from the GetCSV method), transform it into an array of
        // nicely-formatted Employee JSON objects. Note that these Employees are
        // NOT saved or otherwise processed by default.
        // POST: api/CSVExtract/EmployeesFromCSV
        [HttpPost("EmployeesFromCSV")]
        public async Task<ActionResult<List<Employee>>> EmployeesFromCSV()
        ***REMOVED***
            var employeeList = await CSVExtractService
                .EmployeesFromCSV(Request.Body, Encoding.UTF8);

            return employeeList;
      ***REMOVED***

        [HttpPut("ReconcileEmployee")]
        public async Task<ActionResult<Employee>> ReconcileEmployee(Employee employee)
        ***REMOVED***
            // Reconciliation logic here.

            // if (id != employee.Id)
            // ***REMOVED***
            //     return BadRequest();
            // ***REMOVED***

            // if (Employee)

            // _context.Entry(employee).State = EntityState.Modified;

            // try
            // ***REMOVED***
            //     await _context.SaveChangesAsync();
            // ***REMOVED***
            // catch (DbUpdateConcurrencyException)
            // ***REMOVED***
            //     if (!EmployeeExists(employee))
            //     ***REMOVED***
            //         return NotFound();
            //   ***REMOVED***
            //     else
            //     ***REMOVED***
            //         throw;
            //   ***REMOVED***
            // ***REMOVED***

            // The possible states of an employee.

            // How do we determine uniqueness?
            //      EmployeeId + ExitCount.

            // We need to check two things.
            //   One, is THEIR employee in OUR database.
            //   Two, is OUR *active* employee in THEIR CSV.
            var newEmployee = await EmployeeReconciliationService
                .ReconcileEmployee(_context, employee);

            return newEmployee;
      ***REMOVED***


  ***REMOVED***
***REMOVED***
