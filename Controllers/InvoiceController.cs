using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspnetCoreMvcStarter.Models;

namespace AspnetCoreMvcStarter.Controllers;

public class InvoiceController : Controller
{
  private readonly ILogger<InvoiceController> _logger;

  public InvoiceController(ILogger<InvoiceController> logger)
  {
    _logger = logger;
  }

  public IActionResult Index()
  {
    
    return View();
  }

  [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
  public IActionResult Error()
  {
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
  }
}
