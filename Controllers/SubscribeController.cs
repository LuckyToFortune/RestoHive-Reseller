using AspnetCoreMvcStarter.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace AspnetCoreMvcStarter.Controllers
{
  [Route("Subscribe")]
  [ApiController]
  public class SubscribeController : ControllerBase
  {
    private readonly string? _connectionString;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SubscribeController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
      _connectionString = configuration.GetConnectionString("DefaultConnection");
      _httpContextAccessor = httpContextAccessor;
    }

    [HttpPost("Add")]
    public async Task<IActionResult> AddSubscriber([FromBody] SubscriberModel model)
    {
      if (model == null || string.IsNullOrWhiteSpace(model.Subscriber_Email))
      {
        return BadRequest(new { status = "error", message = "Invalid email address." });
      }

      try
      {
        string userIpAddress = GetClientIp();

        using (var connection = new SqlConnection(_connectionString))
        {
          await connection.OpenAsync();

          
          string checkQuery = "SELECT COUNT(*) FROM Subscribers WHERE Subscriber_Email = @Email AND HostDomain_Name = @Host";
          using (var checkCmd = new SqlCommand(checkQuery, connection))
          {
            checkCmd.Parameters.AddWithValue("@Email", model.Subscriber_Email);
            checkCmd.Parameters.AddWithValue("@Host", model.HostDomain_Name);

            int count = (int)(await checkCmd.ExecuteScalarAsync() ?? 0);
            if (count > 0)
            {
              return Ok(new { status = "exists", message = "You're already subscribed! Stay tuned for exciting updates. 🚀" });
            }
          }

          //  Insert new subscriber with IP address
          string query = "INSERT INTO Subscribers (Subscriber_Email, HostDomain_Name, IP_Address) VALUES (@Email, @Host, @IPAddress)";
          using (var cmd = new SqlCommand(query, connection))
          {
            cmd.Parameters.AddWithValue("@Email", model.Subscriber_Email);
            cmd.Parameters.AddWithValue("@Host", model.HostDomain_Name);
            cmd.Parameters.AddWithValue("@IPAddress", userIpAddress ?? (object)DBNull.Value);

            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            if (rowsAffected > 0)
            {
              return Ok(new { status = "success", message = "🎉 You’ve successfully subscribed! Expect something amazing soon! 🚀" });
            }
          }
        }

        return BadRequest(new { status = "error", message = "Failed to subscribe. Please try again later." });
      }
      catch (Exception)
      {
        return StatusCode(500, new { status = "error", message = "Something went wrong. Please try again later!" });
      }
    }

    
    private string GetClientIp()
    {
      string? ipAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
      if (string.IsNullOrEmpty(ipAddress))
      {
        ipAddress = _httpContextAccessor.HttpContext?.Request.Headers["X-Forwarded-For"].FirstOrDefault();
      }

      return ipAddress ?? "Unknown";
    }
  }
}
