namespace DigitalWallet.API.DTOs
{
    public class TransferMoneyDto
    {
        public string ToEmail { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }

    public class DepositDto
    {
        public decimal Amount { get; set; }
    }

    public class WithdrawDto
    {
        public decimal Amount { get; set; }
    }

    public class TransactionResponseDto
    {
        public Guid Id { get; set; }
        public string FromUserEmail { get; set; } = string.Empty;
        public string ToUserEmail { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Timestamp { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class BalanceDto
    {
        public decimal Balance { get; set; }
    }
}