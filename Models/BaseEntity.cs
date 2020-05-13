using System;
using Sieve.Attributes;

namespace ExitSurveyAdmin.Models
***REMOVED***
    public class BaseEntity
    ***REMOVED***
        public DateTime CreatedTs ***REMOVED*** get; set; ***REMOVED***

        [Sieve(CanFilter = true, CanSort = true)]
        public DateTime ModifiedTs ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***