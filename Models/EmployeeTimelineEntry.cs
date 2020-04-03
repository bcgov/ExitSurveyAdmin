using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeTimelineEntry : BaseEntity
    {
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [JsonIgnore]
        public virtual Employee Employee { get; set; }

        [Required]
        public string EmployeeActionCode { get; set; }

        public virtual EmployeeActionEnum EmployeeAction { get; set; }

        [Required]
        public string EmployeeStatusCode { get; set; }
        public virtual EmployeeStatusEnum EmployeeStatus { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}