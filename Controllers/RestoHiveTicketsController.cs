using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspnetCoreMvcStarter.Models;

namespace AspnetCoreMvcStarter.Controllers;

public class RestoHiveTicketsController : Controller
{
    private readonly ILogger<RestoHiveTicketsController> _logger;

    public RestoHiveTicketsController(ILogger<RestoHiveTicketsController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
    
    public IActionResult Details(int id)
    {
        // In a real application, you would fetch the ticket details from a database
        // For now, we'll just pass the ID to the view
        ViewBag.TicketId = id;
        return View();
    }
    
    public IActionResult New()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}