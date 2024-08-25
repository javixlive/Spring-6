namespace BollywoodAPI.Models.Entities
{
    public class Favorites
    {
        public Guid favoritesId {  get; set; }
        public required Guid userId { get; set; }
        public required Guid movieId { get; set; }
    }
}
