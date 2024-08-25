namespace BollywoodAPI.Models.Entities
{
    public class User
    {
        public Guid userID {  get; set; }
        public string? userName {  get; set; }
        public required string userEmail { get; set; }
        public required string userPassword { get; set; }

    }
}
