using DaycareAPI.Data;
using DaycareAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaycareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyActivitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DailyActivitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DailyActivities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailyActivity>>> GetDailyActivities()
        {
            return await _context.DailyActivities
                .Include(da => da.Child)
                .OrderByDescending(da => da.ActivityTime)
                .ToListAsync();
        }

        // GET: api/DailyActivities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailyActivity>> GetDailyActivity(int id)
        {
            var activity = await _context.DailyActivities
                .Include(da => da.Child)
                .FirstOrDefaultAsync(da => da.Id == id);

            if (activity == null)
                return NotFound();

            return activity;
        }

        // GET: api/DailyActivities/ByChild/5
        [HttpGet("ByChild/{childId}")]
        public async Task<ActionResult<IEnumerable<DailyActivity>>> GetActivitiesByChild(int childId)
        {
            return await _context.DailyActivities
                .Where(da => da.ChildId == childId)
                .Include(da => da.Child)
                .OrderByDescending(da => da.ActivityTime)
                .ToListAsync();
        }

        // GET: api/DailyActivities/ByDate?date=2024-01-01
        [HttpGet("ByDate")]
        public async Task<ActionResult<IEnumerable<DailyActivity>>> GetActivitiesByDate([FromQuery] DateTime date)
        {
            var startDate = date.Date;
            var endDate = startDate.AddDays(1);

            return await _context.DailyActivities
                .Where(da => da.ActivityTime >= startDate && da.ActivityTime < endDate)
                .Include(da => da.Child)
                .OrderByDescending(da => da.ActivityTime)
                .ToListAsync();
        }

        // POST: api/DailyActivities
        [HttpPost]
        public async Task<ActionResult<DailyActivity>> CreateDailyActivity(DailyActivity activity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verify child exists
            var childExists = await _context.Children.AnyAsync(c => c.Id == activity.ChildId);
            if (!childExists)
                return BadRequest(new { message = "Child not found" });

            activity.CreatedAt = DateTime.UtcNow;
            _context.DailyActivities.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDailyActivity), new { id = activity.Id }, activity);
        }

        // PUT: api/DailyActivities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDailyActivity(int id, DailyActivity activity)
        {
            if (id != activity.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailyActivityExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/DailyActivities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDailyActivity(int id)
        {
            var activity = await _context.DailyActivities.FindAsync(id);
            if (activity == null)
                return NotFound();

            _context.DailyActivities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DailyActivityExists(int id)
        {
            return _context.DailyActivities.Any(e => e.Id == id);
        }
    }
}