using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
    public class EmployeeTimelineEntry : BaseEntity
    {
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public Employee Employee { get; set; }

        [Required]
        public EmployeeActionTypeEnum EmployeeActionType { get; set; }

        public EmployeeStatusEnum EmployeeStatus { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}