using System;
using System.ComponentModel.DataAnnotations;

namespace RestoHive_Reseller.Models
{
    public class DiscountModel
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public required string Code { get; set; }
        
        [Required]
        [Range(0.01, 100)]
        public decimal Percentage { get; set; }
        
        public string? CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [Required]
        public DateTime ExpiresAt { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation property for future use with Entity Framework
        public string? CreatedBy { get; set; }
    }
}
