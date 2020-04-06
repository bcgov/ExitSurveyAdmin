using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;

namespace ExitSurveyAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {
        private readonly ExitSurveyAdminContext _context;

        public AdminUsersController(ExitSurveyAdminContext context)
        {
            _context = context;
        }

        // GET: api/AdminUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminUser>>> GetAdminUsers()
        {
            return await _context.AdminUsers.ToListAsync();
        }

        // GET: api/AdminUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminUser>> GetAdminUser(string id)
        {
            var adminUser = await _context.AdminUsers.FindAsync(id);

            if (adminUser == null)
            {
                return NotFound();
            }

            return adminUser;
        }

        // PUT: api/AdminUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminUser(string id, AdminUser adminUser)
        {
            if (id != adminUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(adminUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AdminUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AdminUser>> PostAdminUser(AdminUser adminUser)
        {
            _context.AdminUsers.Add(adminUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdminUser), new { id = adminUser.Id }, adminUser);
        }

        // DELETE: api/AdminUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdminUser>> DeleteAdminUser(string id)
        {
            var adminUser = await _context.AdminUsers.FindAsync(id);
            if (adminUser == null)
            {
                return NotFound();
            }

            _context.AdminUsers.Remove(adminUser);
            await _context.SaveChangesAsync();

            return adminUser;
        }

        private bool AdminUserExists(string id)
        {
            return _context.AdminUsers.Any(e => e.Id == id);
        }
    }
}
