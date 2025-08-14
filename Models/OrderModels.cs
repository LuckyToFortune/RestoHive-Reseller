using System.Collections.Generic;

namespace RestoHive_Reseller.Models
{
    public class OrderData
    {
        public required string TrackingNumber { get; set; }
        public required List<CartItem> Cart { get; set; }
        public decimal Total { get; set; }
        public required string OrderDate { get; set; }
        public required string EstimatedDelivery { get; set; }
        public required string Status { get; set; }
        public required string CustomerName { get; set; }
        public required string ShippingAddress { get; set; }
        public required string Courier { get; set; }
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
