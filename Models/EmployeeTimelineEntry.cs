using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeTimelineEntry : BaseEntity
    ***REMOVED***
        [Key]
        [Required]
        public string Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string EmployeeId ***REMOVED*** get; set; ***REMOVED***

        [JsonIgnore]
        public virtual Employee Employee ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string EmployeeActionCode ***REMOVED*** get; set; ***REMOVED***

        public virtual EmployeeActionEnum EmployeeAction ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string EmployeeStatusCode ***REMOVED*** get; set; ***REMOVED***
        public virtual EmployeeStatusEnum EmployeeStatus ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Comment ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***