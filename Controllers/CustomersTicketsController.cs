using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspnetCoreMvcStarter.Models;

namespace AspnetCoreMvcStarter.Controllers;

public class CustomersTicketsController : Controller
{
    private readonly ILogger<CustomersTicketsController> _logger;

    public CustomersTicketsController(ILogger<CustomersTicketsController> logger)
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