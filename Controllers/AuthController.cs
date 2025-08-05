using Microsoft.AspNetCore.Mvc;

namespace RestoHive_Reseller.Controllers
{
  public class AuthController : Controller
  {
    public IActionResult RegisterMultiSteps() => View();
  }
}
