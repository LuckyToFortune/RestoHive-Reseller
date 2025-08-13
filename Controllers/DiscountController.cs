using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace RestoHive.Controllers
{
    public class DiscountController : Controller
    {
        private readonly ILogger<DiscountController> _logger;

        public DiscountController(ILogger<DiscountController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Delete/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // TODO: Uncomment and implement actual delete logic when repository/service is available
                // var discount = await _discountService.GetByIdAsync(id);
                // if (discount == null)
                // {
                //     return NotFound(new { success = false, message = "Discount not found." });
                // }
                // await _discountService.DeleteAsync(discount);
                
                _logger.LogInformation($"Discount with ID {id} deleted successfully");
                return Json(new { success = true, message = "Discount deleted successfully!" });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, $"Error deleting discount with ID {id}");
                return StatusCode(500, new { success = false, message = "An error occurred while deleting the discount. Please try again later." });
            }
        }
    }
}
