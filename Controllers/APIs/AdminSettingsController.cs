using ExitSurveyAdmin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ExitSurveyAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminSettingsController : ControllerBase
    {
        private readonly ExitSurveyAdminContext context;

        public AdminSettingsController(ExitSurveyAdminContext context)
        {
            this.context = context;
        }

        // GET: api/AdminSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminSetting>>> GetAdminSettings()
        {
            return await context.AdminSettings.ToListAsync();
        }

        // GET: api/AdminSettings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminSetting>> GetAdminSetting(int id)
        {
            var adminSetting = await context.AdminSettings
                .FirstOrDefaultAsync(ete => ete.Id == id);

            if (adminSetting == null)
            {
                return NotFound();
            }

            return adminSetting;
        }

        // PATCH: api/AdminSettings
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        public async Task<ActionResult<AdminSetting>> PatchAdminSetting(int id, AdminSettingPatchDto adminSetting)
        {
            var existingAdminSetting = await FindById(id);
            existingAdminSetting.Value = adminSetting.Value;

            context.Entry(existingAdminSetting).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();

                return Ok(existingAdminSetting);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminSettingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        private bool AdminSettingExists(int id)
        {
            return context.AdminSettings.Any(e => e.Id == id);
        }

        private async Task<AdminSetting> FindById(int id)
        {
            var adminSetting = await context.AdminSettings
                .FirstOrDefaultAsync(i => i.Id == id);

            return adminSetting;
        }
    }
}
