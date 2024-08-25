namespace BollywoodAPI.Models
{
    public class UpdateFavoritesDto
    {
        public required Guid userId { get; set; }
        public required Guid movieId { get; set; }
    }
}
