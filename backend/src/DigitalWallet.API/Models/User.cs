using System.ComponentModel.DataAnnotations;

namespace DigitalWallet.API.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }

        public decimal Balance { get; set; }
        public ICollection<Transaction> SentTransactions { get; set; }
        public ICollection<Transaction> ReceivedTransactions { get; set; }

    }
}