using Microsoft.AspNetCore.Mvc;
using RestoHive_Reseller.Models;

namespace RestoHive_Reseller.Controllers
{
    public class CompetitorsController : Controller
    {
        public IActionResult Index()
        {
            var viewModel = new CompetitorsViewModel
            {
                Features = new List<string>
                {
                    "24/7 Support and configuration services",
                    "Online ordering system",
                    "Inventory management",
                    "Customer loyalty program",
                    "Multi-location support",
                    "Mobile app for staff",
                    "Analytics and reporting",
                    "Payment processing integration"
                },
                Competitors = new List<CompetitorModel>
                {
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = false }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Clover",
                        Logo = "clover",
                        Price = 25.99m,
                        IsHighlighted = false,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = false },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    },
                    new CompetitorModel
                    {
                        Name = "Resto POS",
                        Logo = "resto-pos",
                        Price = 25.99m,
                        IsHighlighted = true,
                        Features = new List<FeatureAvailability>
                        {
                            new FeatureAvailability { FeatureName = "24/7 Support and configuration services", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Online ordering system", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Inventory management", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Customer loyalty program", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Multi-location support", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Mobile app for staff", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Analytics and reporting", IsAvailable = true },
                            new FeatureAvailability { FeatureName = "Payment processing integration", IsAvailable = true }
                        }
                    }
                }
            };

            return View(viewModel);
        }
    }
}
