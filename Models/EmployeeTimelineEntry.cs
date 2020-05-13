using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class EmployeeTimelineEntry : BaseEntity
    ***REMOVED***
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id ***REMOVED*** get; set; ***REMOVED***

        [Required]
        public int EmployeeId ***REMOVED*** get; set; ***REMOVED***

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