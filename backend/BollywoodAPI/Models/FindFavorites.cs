namespace BollywoodAPI.Models
{
    public class FindFavorites
    {
        public required Guid userId { get; set; }
        public required Guid movieId { get; set; }
    }
}
