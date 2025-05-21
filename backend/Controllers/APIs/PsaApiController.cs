using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services.PsaApi;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Authorize(Policy = "UserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class PsaApiController : ControllerBase
    ***REMOVED***
        private readonly PsaApiService psaApiService;

        public PsaApiController(PsaApiService psaApiService)
        ***REMOVED***
            this.psaApiService = psaApiService;
      ***REMOVED***

        [HttpGet("CurrentEmployees")]
        public async Task<ActionResult<IList<Employee>>> CurrentEmployees()
        ***REMOVED***
            var employees = await this.psaApiService.GetCurrent();

            return Ok(employees);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
