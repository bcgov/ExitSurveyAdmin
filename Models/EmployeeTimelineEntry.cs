using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeTimelineEntry : BaseEntity
    ***REMOVED***
        [Key]
        [Required]
        public string Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public Employee Employee ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public EmployeeActionEnum EmployeeAction ***REMOVED*** get; set; ***REMOVED***

        public EmployeeStatusEnum EmployeeStatus ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Comment ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***