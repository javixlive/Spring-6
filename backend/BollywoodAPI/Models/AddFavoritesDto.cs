namespace BollywoodAPI.Models
{
    public class AddFavoritesDto
    {
        public required Guid userId { get; set; }
        public required Guid movieId { get; set; }
    }
}
