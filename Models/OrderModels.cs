using System.Collections.Generic;

namespace RestoHive_Reseller.Models
{
    public class OrderData
    {
        public string TrackingNumber { get; set; }
        public List<CartItem> Cart { get; set; }
        public decimal Total { get; set; }
        public string OrderDate { get; set; }
        public string EstimatedDelivery { get; set; }
        public string Status { get; set; }
        public string CustomerName { get; set; }
        public string ShippingAddress { get; set; }
        public string Courier { get; set; }
    }
    
    public class CartItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
    }
}
