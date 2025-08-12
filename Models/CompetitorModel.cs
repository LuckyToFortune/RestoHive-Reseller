namespace RestoHive_Reseller.Models
{
    public class CompetitorModel
    {
        public string Name { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsHighlighted { get; set; }
        public List<FeatureAvailability> Features { get; set; } = new List<FeatureAvailability>();
    }

    public class FeatureAvailability
    {
        public string FeatureName { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }

    public class CompetitorsViewModel
    {
        public List<CompetitorModel> Competitors { get; set; } = new List<CompetitorModel>();
        public List<string> Features { get; set; } = new List<string>();
    }
} 