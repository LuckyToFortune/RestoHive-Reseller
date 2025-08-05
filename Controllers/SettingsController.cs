using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspnetCoreMvcStarter.Models;

namespace AspnetCoreMvcStarter.Controllers;

public class SettingsController : Controller
{
  private readonly ILogger<SettingsController> _logger;

  public SettingsController(ILogger<SettingsController> logger)
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
