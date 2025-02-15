using Microsoft.EntityFrameworkCore;
using DigitalWallet.API.Data;
using DigitalWallet.API.DTOs;
using DigitalWallet.API.Models;
using DigitalWallet.API.Exceptions;

namespace DigitalWallet.API.Services
{
    public class WalletService : IWalletService
    {
        private readonly ApplicationDbContext _context;

        public WalletService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetBalanceAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new NotFoundException("User not found");
            
            return user.Balance;
        }

        public async Task<TransactionResponseDto> TransferMoneyAsync(Guid fromUserId, string toEmail, decimal amount)
        {
            if (amount <= 0)
                throw new BadRequestException("Amount must be positive");

            var fromUser = await _context.Users.FindAsync(fromUserId);
            var toUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == toEmail);

            if (fromUser == null || toUser == null)
                throw new NotFoundException("User not found");

            if (fromUser.Id == toUser.Id)
                throw new BadRequestException("Cannot transfer money to yourself");

            if (fromUser.Balance < amount)
                throw new BadRequestException("Insufficient funds");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                fromUser.Balance -= amount;
                toUser.Balance += amount;

                var transactionRecord = new Transaction
                {
                    Id = Guid.NewGuid(),
                    FromUserId = fromUserId,
                    ToUserId = toUser.Id,
                    Amount = amount,
                    Timestamp = DateTime.UtcNow,
                    Type = TransactionType.Transfer,
                    Description = $"Transfer to {toUser.Email}"
                };

                _context.Transactions.Add(transactionRecord);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return MapToTransactionDto(transactionRecord);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<TransactionResponseDto> DepositAsync(Guid userId, decimal amount)
        {
            if (amount <= 0)
                throw new BadRequestException("Amount must be positive");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new NotFoundException("User not found");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                user.Balance += amount;

                var transactionRecord = new Transaction
                {
                    Id = Guid.NewGuid(),
                    FromUserId = userId,
                    ToUserId = userId,
                    Amount = amount,
                    Timestamp = DateTime.UtcNow,
                    Type = TransactionType.Deposit,
                    Description = "Deposit"
                };

                _context.Transactions.Add(transactionRecord);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return MapToTransactionDto(transactionRecord);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<TransactionResponseDto> WithdrawAsync(Guid userId, decimal amount)
        {
            if (amount <= 0)
                throw new BadRequestException("Amount must be positive");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new NotFoundException("User not found");

            if (user.Balance < amount)
                throw new BadRequestException("Insufficient funds");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                user.Balance -= amount;

                var transactionRecord = new Transaction
                {
                    Id = Guid.NewGuid(),
                    FromUserId = userId,
                    ToUserId = userId,
                    Amount = amount,
                    Timestamp = DateTime.UtcNow,
                    Type = TransactionType.Withdrawal,
                    Description = "Withdrawal"
                };

                _context.Transactions.Add(transactionRecord);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return MapToTransactionDto(transactionRecord);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetTransactionHistoryAsync(Guid userId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.FromUserId == userId || t.ToUserId == userId)
                .Include(t => t.FromUser)
                .Include(t => t.ToUser)
                .OrderByDescending(t => t.Timestamp)
                .Take(50)
                .ToListAsync();

            return transactions.Select(MapToTransactionDto);
        }

        private TransactionResponseDto MapToTransactionDto(Transaction transaction)
        {
            return new TransactionResponseDto
            {
                Id = transaction.Id,
                FromUserEmail = transaction.FromUser?.Email ?? string.Empty,
                ToUserEmail = transaction.ToUser?.Email ?? string.Empty,
                Amount = transaction.Amount,
                Timestamp = transaction.Timestamp,
                Type = transaction.Type.ToString(),
                Description = transaction.Description
            };
        }
    }
}