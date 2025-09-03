using ExitSurveyAdmin.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ExitSurveyAdmin.Services.PsaApi
{
    // The data transfer object representing a response to a call to the PSA
    // API.
    public class PsaApiRequestDto
    {
        [JsonProperty("value")]
        public List<Employee> Employees { get; set; }
    }
}
