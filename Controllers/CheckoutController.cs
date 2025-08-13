using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace RestoHive_Reseller.Controllers
{
    public class CheckoutController : Controller
    {
        public IActionResult Index()
        {
         
            var cartData = Request.Query["cart"].ToString();
            
            if (string.IsNullOrEmpty(cartData))
            {
             
                return RedirectToAction("Index", "Store");
            }
            
            try
            {
           
                var decodedCart = System.Web.HttpUtility.UrlDecode(cartData);
                var cartItems = JsonSerializer.Deserialize<List<CartItem>>(decodedCart);
                
                ViewBag.CartItems = cartItems;
                ViewBag.Total = cartItems?.Sum(item => item.Price * item.Quantity) ?? 0;
                
                return View();
            }
            catch
            {
             
                return RedirectToAction("Index", "Store");
            }
        }
        
        [HttpPost]
        public IActionResult ProcessPayment()
        {
            // Handle payment processing here
            // This is where you would integrate with payment gateways
            
            return Json(new { success = true, message = "Payment processed successfully!" });
        }
    }
    
    public class CartItem
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public required string Image { get; set; }
    }
}

