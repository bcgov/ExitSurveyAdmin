using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace ExitSurveyAdmin.Models
{
    public class BaseEntity
    {
        public DateTime CreatedTs { get; set; }
 
        public DateTime ModifiedTs { get; set; }
    }
}