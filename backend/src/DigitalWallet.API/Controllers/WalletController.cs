using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using DigitalWallet.API.Services;
using DigitalWallet.API.DTOs;

namespace DigitalWallet.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        [HttpGet("balance")]
        public async Task<ActionResult<BalanceDto>> GetBalance()
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
                var balance = await _walletService.GetBalanceAsync(userId);
                return Ok(new BalanceDto { Balance = balance });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("transfer")]
        public async Task<ActionResult<TransactionResponseDto>> TransferMoney([FromBody] TransferMoneyDto request)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
                var result = await _walletService.TransferMoneyAsync(userId, request.ToEmail, request.Amount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("deposit")]
        public async Task<ActionResult<TransactionResponseDto>> Deposit([FromBody] DepositDto request)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
                var result = await _walletService.DepositAsync(userId, request.Amount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("withdraw")]
        public async Task<ActionResult<TransactionResponseDto>> Withdraw([FromBody] WithdrawDto request)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
                var result = await _walletService.WithdrawAsync(userId, request.Amount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("transactions")]
        public async Task<ActionResult<IEnumerable<TransactionResponseDto>>> GetTransactionHistory()
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
                var transactions = await _walletService.GetTransactionHistoryAsync(userId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}