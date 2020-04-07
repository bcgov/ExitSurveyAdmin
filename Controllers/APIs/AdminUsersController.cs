using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Controllers
***REMOVED***
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    ***REMOVED***
        private readonly ExitSurveyAdminContext _context;

        public AdminUsersController(ExitSurveyAdminContext context)
        ***REMOVED***
            _context = context;
      ***REMOVED***

        // GET: api/AdminUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminUser>>> GetAdminUsers()
        ***REMOVED***
            return await _context.AdminUsers.ToListAsync();
      ***REMOVED***

        // GET: api/AdminUsers/5
        [HttpGet("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<AdminUser>> GetAdminUser(int id)
        ***REMOVED***
            var adminUser = await _context.AdminUsers.FindAsync(id);

            if (adminUser == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            return adminUser;
      ***REMOVED***

        // PUT: api/AdminUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("***REMOVED***id***REMOVED***")]
        public async Task<IActionResult> PutAdminUser(int id, AdminUser adminUser)
        ***REMOVED***
            if (id != adminUser.Id)
            ***REMOVED***
                return BadRequest();
          ***REMOVED***

            _context.Entry(adminUser).State = EntityState.Modified;

            try
            ***REMOVED***
                await _context.SaveChangesAsync();
          ***REMOVED***
            catch (DbUpdateConcurrencyException)
            ***REMOVED***
                if (!AdminUserExists(id))
                ***REMOVED***
                    return NotFound();
              ***REMOVED***
                else
                ***REMOVED***
                    throw;
              ***REMOVED***
          ***REMOVED***

            return NoContent();
      ***REMOVED***

        // POST: api/AdminUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AdminUser>> PostAdminUser(AdminUser adminUser)
        ***REMOVED***
            _context.AdminUsers.Add(adminUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdminUser), new ***REMOVED*** id = adminUser.Id ***REMOVED***, adminUser);
      ***REMOVED***

        // DELETE: api/AdminUsers/5
        [HttpDelete("***REMOVED***id***REMOVED***")]
        public async Task<ActionResult<AdminUser>> DeleteAdminUser(int id)
        ***REMOVED***
            var adminUser = await _context.AdminUsers.FindAsync(id);
            if (adminUser == null)
            ***REMOVED***
                return NotFound();
          ***REMOVED***

            _context.AdminUsers.Remove(adminUser);
            await _context.SaveChangesAsync();

            return adminUser;
      ***REMOVED***

        private bool AdminUserExists(int id)
        ***REMOVED***
            return _context.AdminUsers.Any(e => e.Id == id);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
