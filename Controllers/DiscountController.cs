using Microsoft.AspNetCore.Mvc;

namespace RestoHive.Controllers
{
    public class DiscountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
