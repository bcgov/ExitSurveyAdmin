using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeStatusEnum
    {

        [Key]
        [Required]
        public string Code { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public List<Employee> Employees { get; set; }

        [JsonIgnore]
        public List<EmployeeTimelineEntry> TimelineEntries { get; set; }
    }
}