using Sieve.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExitSurveyAdmin.Models
{
    public class AdminSetting : BaseEntity
    {
        public static readonly string EmployeeExpirationThreshold = "EmployeeExpirationThreshold";

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Key { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Value { get; set; }
    }

    public class AdminSettingPatchDto
    {
        public string Value { get; set; }
    }
}