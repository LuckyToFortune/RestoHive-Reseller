using Microsoft.AspNetCore.Mvc;

namespace RestoHive_Reseller.Controllers
{
    public class ResellerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
