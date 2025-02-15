using Microsoft.EntityFrameworkCore;
using DigitalWallet.API.Models;

namespace DigitalWallet.API.Data 
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            modelBuilder.Entity<User>()
                .HasMany(u => u.SentTransactions)
                .WithOne(t => t.FromUser)
                .HasForeignKey(t => t.FromUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.ReceivedTransactions)
                .WithOne(t => t.ToUser)
                .HasForeignKey(t => t.ToUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}