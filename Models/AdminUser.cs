using System;
using System.ComponentModel.DataAnnotations;

namespace ExitSurveyAdmin.Models
{
    public class AdminUser : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastLoginTs { get; set; }
    }
}