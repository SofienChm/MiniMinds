using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DaycareAPI.Models
{
    public class Child
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(10)]
        public string Gender { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Allergies { get; set; }

        [StringLength(500)]
        public string? MedicalNotes { get; set; }

        public string? ProfilePicture { get; set; }

        [Required]
        public int ParentId { get; set; }

        public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("ParentId")]
        public Parent? Parent { get; set; }

        public ICollection<DailyActivity> DailyActivities { get; set; } = new List<DailyActivity>();
        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
}