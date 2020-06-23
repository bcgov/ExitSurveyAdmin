using Sieve.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class AdminSetting : BaseEntity
    ***REMOVED***
        public static readonly string EmployeeNotExitingThreshold = "EmployeeNotExitingThreshold";

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Key ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string DisplayName ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public string Value ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***

    public class AdminSettingPatchDto
    ***REMOVED***
        public string Value ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***