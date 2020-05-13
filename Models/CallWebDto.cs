#nullable enable

using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExitSurveyAdmin.Services.CallWeb
{
    // The data transfer object to use when communicating with the CallWeb API.
    public partial class CallWebDto
    {
        public string? Telkey { get; set; }
        public string? Aemail { get; set; }
        public string? Aministry { get; set; }
        public string? Afname { get; set; }
        public string? Alname { get; set; }
        public string? Alvreason { get; set; }
        public int? Lvcode { get; set; }
        public string? Aeffdate { get; set; }
        public string? AcurrentStatus { get; set; }
        public int? Qcomp { get; set; }
    }
}
