using DaycareAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DaycareAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Parent> Parents { get; set; }
        public DbSet<Child> Children { get; set; }
        public DbSet<DailyActivity> DailyActivities { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<DaycareProgram> DaycarePrograms { get; set; }
        public DbSet<ProgramEnrollment> ProgramEnrollments { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure relationships
            builder.Entity<Child>()
                .HasOne(c => c.Parent)
                .WithMany(p => p.Children)
                .HasForeignKey(c => c.ParentId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<DailyActivity>()
                .HasOne(da => da.Child)
                .WithMany(c => c.DailyActivities)
                .HasForeignKey(da => da.ChildId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Attendance>()
                .HasOne(a => a.Child)
                .WithMany(c => c.Attendances)
                .HasForeignKey(a => a.ChildId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ProgramEnrollment>()
                .HasOne(pe => pe.Program)
                .WithMany(p => p.Enrollments)
                .HasForeignKey(pe => pe.ProgramId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ProgramEnrollment>()
                .HasOne(pe => pe.Child)
                .WithMany()
                .HasForeignKey(pe => pe.ChildId)
                .OnDelete(DeleteBehavior.Cascade);

            // Prevent duplicate enrollments
            builder.Entity<ProgramEnrollment>()
                .HasIndex(pe => new { pe.ProgramId, pe.ChildId })
                .IsUnique();

            // Indexes for better performance
            builder.Entity<Parent>()
                .HasIndex(p => p.Email)
                .IsUnique();

            builder.Entity<Attendance>()
                .HasIndex(a => new { a.ChildId, a.Date });

            builder.Entity<DailyActivity>()
                .HasIndex(da => new { da.ChildId, da.ActivityTime });

            // Message relationships
            builder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany()
                .HasForeignKey(m => m.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasIndex(m => new { m.SenderId, m.RecipientId, m.SentAt });
        }
    }
}