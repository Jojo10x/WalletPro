using Microsoft.AspNetCore.Mvc;
using DigitalWallet.API.Services;
using DigitalWallet.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    public async Task<ActionResult<AuthResponseDto>> Auth([FromBody] AuthRequestDto authDto)
    {
        try
        {
            if (authDto.Type == "login")
            {
                var loginDto = new LoginDto 
                { 
                    Email = authDto.Email, 
                    Password = authDto.Password 
                };
                var response = await _authService.LoginAsync(loginDto);
                return Ok(response);
            }
            else if (authDto.Type == "register")
            {
                var registerDto = new RegisterDto 
                { 
                    Email = authDto.Email, 
                    Password = authDto.Password,
                    ConfirmPassword = authDto.ConfirmPassword 
                };
                var response = await _authService.RegisterAsync(registerDto);
                return Ok(response);
            }
            
            return BadRequest("Invalid auth type");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}