using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

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

        public List<Employee> Employees { get; set; }

        public List<EmployeeTimelineEntry> EmployeeTimelineEntries { get; set; }
    }
}