using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExitSurveyAdmin.Models
***REMOVED***



    public class EmployeeStatusEnum
    ***REMOVED***

        [Key]
        [Required]
        public string Code ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string State ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Description ***REMOVED*** get; set; ***REMOVED***

        public List<Employee> Employees ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***