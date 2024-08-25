namespace BollywoodAPI.Models
{
    public class AddMovieDto
    {
        public required string title { get; set; }
        public string? overview { get; set; }
        public string? release_date { get; set; }
        public decimal? vote_average { get; set; }
        public int? vote_count { get; set; }
        public string? poster_path { get; set; }
        public string? original_language { get; set; }
        public int? genreId { get; set; }
    }
}
