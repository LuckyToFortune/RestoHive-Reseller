using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using RestoHive_Reseller.Models;
using System.Collections.Generic;

namespace RestoHive_Reseller.Controllers
{
    public class OrderTrackingController : Controller
    {
        public IActionResult Index()
        {
        
            var orderData = Request.Query["order"].ToString();
            
            if (string.IsNullOrEmpty(orderData))
            {
        
                return RedirectToAction("Index", "Store");
            }
            
            try
            {
               
                var decodedOrder = System.Web.HttpUtility.UrlDecode(orderData);
                var order = JsonSerializer.Deserialize<OrderData>(decodedOrder);
                
                ViewBag.Order = order;
                
                return View();
            }
            catch
            {
                
                return RedirectToAction("Index", "Store");
            }
        }
    }
}

