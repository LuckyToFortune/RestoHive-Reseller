using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspnetCoreMvcStarter.Models;

namespace AspnetCoreMvcStarter.Controllers;

public class BalanceController : Controller
{
  private readonly ILogger<BalanceController> _logger;

  public BalanceController(ILogger<BalanceController> logger)
  {
    _logger = logger;
  }

  public IActionResult Index()
  {
    // return View("MiscComingSoon"); // ✅ Set the Coming Soon page as default
    return View();
  }

  [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult Error()
  {
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
  }
}
