using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class AdminUser : BaseEntity
    ***REMOVED***
        [Key]
        public string Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string EmployeeId ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string FirstName ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string LastName ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Email ***REMOVED*** get; set; ***REMOVED***

        [DataType(DataType.DateTime)]
        public DateTime LastLoginTs ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***