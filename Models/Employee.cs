using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
  public class Employee
  {
    [Required]
    public string Id { get; set; }

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string FirstName { get; set; }

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string LastName { get; set; }


    [DataType(DataType.Date)]
    [Required]
    public DateTime BirthDate { get; set; }
  }
}