using DigitalWallet.API.DTOs;

namespace DigitalWallet.API.Services
{
    public interface IWalletService
    {
        Task<decimal> GetBalanceAsync(Guid userId);
        Task<TransactionResponseDto> TransferMoneyAsync(Guid fromUserId, string toEmail, decimal amount);
        Task<TransactionResponseDto> DepositAsync(Guid userId, decimal amount);
        Task<TransactionResponseDto> WithdrawAsync(Guid userId, decimal amount);
        Task<IEnumerable<TransactionResponseDto>> GetTransactionHistoryAsync(Guid userId);
    }
}
