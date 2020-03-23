using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
***REMOVED***
  public class Employee : BaseEntity
  ***REMOVED***
    [Required]
    public string Id ***REMOVED*** get; set; ***REMOVED***

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string FirstName ***REMOVED*** get; set; ***REMOVED***

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string LastName ***REMOVED*** get; set; ***REMOVED***


    [DataType(DataType.Date)]
    [Required]
    public DateTime BirthDate ***REMOVED*** get; set; ***REMOVED***
***REMOVED***
***REMOVED***