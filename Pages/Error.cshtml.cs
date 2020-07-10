using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace ExitSurveyAdmin.Pages
***REMOVED***
  [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
  public class ErrorModel : PageModel
  ***REMOVED***
    private readonly ILogger<ErrorModel> _logger;

    public ErrorModel(ILogger<ErrorModel> logger)
    ***REMOVED***
      _logger = logger;
  ***REMOVED***

    public string RequestId ***REMOVED*** get; set; ***REMOVED***

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

    public void OnGet()
    ***REMOVED***
      RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
  ***REMOVED***
***REMOVED***
***REMOVED***
