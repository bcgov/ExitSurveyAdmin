using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Authorize(Policy = "UserRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminSettingsController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext context;

        public AdminSettingsController(ExitSurveyAdminContext context)
        ***REMOVED***
            this.context = context;
      ***REMOVED***

        // GET: api/AdminSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminSetting>>> GetAdminSettings()
        ***REMOVED***
            return await context.AdminSettings.ToListAsync();
      ***REMOVED***

        // GET: api/AdminSettings/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<AdminSetting>> GetAdminSetting(int id)
        ***REMOVED***
            var adminSetting = await context.AdminSettings.FirstOrDefaultAsync(ete => ete.Id == id);

            if (adminSetting == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return adminSetting;
      ***REMOVED***

        // PATCH: api/AdminSettings
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<AdminSetting>> PatchAdminSetting(
            int id,
            AdminSettingPatchDto adminSetting
        )
        ***REMOVED***
            var existingAdminSetting = await FindById(id);
            existingAdminSetting.Value = adminSetting.Value;

            context.Entry(existingAdminSetting).State = EntityState.Modified;

            try
            ***REMOVED***
                await context.SaveChangesAsync();

                return Ok(existingAdminSetting);
          ***REMOVED***
            catch (DbUpdateConcurrencyException)
            ***REMOVED***
                if (!AdminSettingExists(id))
                ***REMOVED***
                    return NotFound();
              ***REMOVED***
                else
                ***REMOVED***
                    throw;
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***

        private bool AdminSettingExists(int id)
        ***REMOVED***
            return context.AdminSettings.Any(e => e.Id == id);
      ***REMOVED***

        private async Task<AdminSetting> FindById(int id)
        ***REMOVED***
            var adminSetting = await context.AdminSettings.FirstOrDefaultAsync(i => i.Id == id);

            return adminSetting;
      ***REMOVED***
  ***REMOVED***
***REMOVED***
