using DaycareAPI.Data;
using DaycareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaycareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ParentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Parents
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Parent>>> GetParents()
        {
            return await _context.Parents
                .Include(p => p.Children)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Parents/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Parent>> GetParent(int id)
        {
            var parent = await _context.Parents
                .Include(p => p.Children)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (parent == null)
                return NotFound();

            return parent;
        }

        // POST: api/Parents
        [HttpPost]
        public async Task<ActionResult<Parent>> CreateParent(Parent parent)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            parent.CreatedAt = DateTime.UtcNow;
            _context.Parents.Add(parent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetParent), new { id = parent.Id }, parent);
        }

        // PUT: api/Parents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateParent(int id, Parent parent)
        {
            if (id != parent.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            parent.UpdatedAt = DateTime.UtcNow;
            _context.Entry(parent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParentExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Parents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParent(int id)
        {
            var parent = await _context.Parents.FindAsync(id);
            if (parent == null)
                return NotFound();

            _context.Parents.Remove(parent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParentExists(int id)
        {
            return _context.Parents.Any(e => e.Id == id);
        }
    }
}