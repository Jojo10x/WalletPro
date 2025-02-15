using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DigitalWallet.API.Models;

namespace DigitalWallet.API.Models
{
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid FromUserId { get; set; }

        [Required]
        public Guid ToUserId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public DateTime Timestamp { get; set; }

        public TransactionType Type { get; set; }

        public string Description { get; set; } = string.Empty;
        
        [ForeignKey("FromUserId")]
        public User FromUser { get; set; }

        [ForeignKey("ToUserId")]
        public User ToUser { get; set; }
    }

    public enum TransactionType
    {
        Deposit,
        Withdrawal,
        Transfer
    }
}