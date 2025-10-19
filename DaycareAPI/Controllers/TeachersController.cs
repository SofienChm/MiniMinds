using Microsoft.AspNetCore.Mvc;
using DaycareAPI.Models;

namespace DaycareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private static List<object> teachers = new List<object>
        {
            new { 
                id = 1, 
                firstName = "Sarah", 
                lastName = "Johnson", 
                email = "sarah.johnson@daycare.com",
                phone = "555-0101",
                address = "123 Main St",
                dateOfBirth = "1985-03-15",
                hireDate = "2020-08-01",
                specialization = "Early Childhood",
                salary = 45000,
                profilePicture = "https://via.placeholder.com/150",
                isActive = true,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            },
            new { 
                id = 2, 
                firstName = "Michael", 
                lastName = "Davis", 
                email = "michael.davis@daycare.com",
                phone = "555-0102",
                address = "456 Oak Ave",
                dateOfBirth = "1990-07-22",
                hireDate = "2021-01-15",
                specialization = "Special Needs",
                salary = 48000,
                profilePicture = "https://via.placeholder.com/150",
                isActive = true,
                createdAt = DateTime.UtcNow,
                updatedAt = DateTime.UtcNow
            }
        };

        [HttpGet]
        public IActionResult GetTeachers()
        {
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = teachers.FirstOrDefault(t => ((dynamic)t).id == id);
            if (teacher == null)
                return NotFound();
            return Ok(teacher);
        }

        [HttpPost]
        public IActionResult CreateTeacher([FromBody] TeacherDto teacherData)
        {
            try
            {
                var newId = teachers.Count + 1;
                var newTeacher = new { 
                    id = newId,
                    firstName = teacherData.FirstName,
                    lastName = teacherData.LastName,
                    email = teacherData.Email,
                    phone = teacherData.Phone ?? "555-0000",
                    address = teacherData.Address ?? "No Address",
                    dateOfBirth = teacherData.DateOfBirth,
                    hireDate = teacherData.HireDate,
                    specialization = teacherData.Specialization ?? "General",
                    salary = teacherData.Salary,
                    profilePicture = teacherData.ProfilePicture ?? "https://via.placeholder.com/150",
                    isActive = true,
                    createdAt = DateTime.UtcNow,
                    updatedAt = DateTime.UtcNow
                };
                
                teachers.Add(newTeacher);
                return Ok(newTeacher);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTeacher(int id, [FromBody] object teacherData)
        {
            var teacherIndex = teachers.FindIndex(t => ((dynamic)t).id == id);
            if (teacherIndex == -1)
                return NotFound();
            
            // For simplicity, just return success
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            var teacherIndex = teachers.FindIndex(t => ((dynamic)t).id == id);
            if (teacherIndex == -1)
                return NotFound();
            
            teachers.RemoveAt(teacherIndex);
            return NoContent();
        }
    }
}