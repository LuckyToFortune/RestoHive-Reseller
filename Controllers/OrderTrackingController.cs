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
               
                // Do not double-decode; ASP.NET Core already decodes query values
                var decodedOrder = orderData;
                var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var order = JsonSerializer.Deserialize<OrderData>(decodedOrder, jsonOptions);
                
                if (order == null)
                {
                    return RedirectToAction("Index", "Store");
                }
                
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

