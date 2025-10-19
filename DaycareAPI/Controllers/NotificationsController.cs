using DaycareAPI.Data;
using DaycareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DaycareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        // GET: api/Notifications/Unread
        [HttpGet("Unread")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<object>>> GetUnreadNotifications()
        {
            // Return sample notifications for testing
            var sampleNotifications = new[]
            {
                new { id = 1, title = "New Message", message = "You have a new message from Sarah Johnson", createdAt = DateTime.Now.AddMinutes(-30) },
                new { id = 2, title = "Attendance Update", message = "Emma's attendance has been updated", createdAt = DateTime.Now.AddHours(-2) },
                new { id = 3, title = "Program Enrollment", message = "New child enrolled in Art Program", createdAt = DateTime.Now.AddHours(-5) }
            };
            return Ok(sampleNotifications);
        }

        // GET: api/Notifications/Count
        [HttpGet("Count")]
        [AllowAnonymous]
        public async Task<ActionResult<int>> GetUnreadCount()
        {
            // Return sample count for testing
            return Ok(new { count = 3 });
        }

        // POST: api/Notifications/MarkAsRead/5
        [HttpPost("MarkAsRead/{id}")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound();

            if (notification.UserId != userId)
                return Forbid();

            notification.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Notifications/MarkAllAsRead
        [HttpPost("MarkAllAsRead")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Notifications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound();

            if (notification.UserId != userId)
                return Forbid();

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}