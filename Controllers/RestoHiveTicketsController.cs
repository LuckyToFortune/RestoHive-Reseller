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
      
        ViewBag.TicketId = id;
        return View();
    }

    public IActionResult New(string date)
    {
       
        if (string.IsNullOrEmpty(date) || !DateTime.TryParse(date, out DateTime parsedDate))
        {
            parsedDate = DateTime.Now;
        }
        
        ViewBag.SelectedDate = parsedDate.ToString("dd MMM yyyy");
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
