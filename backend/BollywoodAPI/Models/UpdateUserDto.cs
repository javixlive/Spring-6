namespace BollywoodAPI.Models
{
    public class UpdateUserDto
    {
        public string? userName { get; set; }
        public required string userEmail { get; set; }
        public required string userPassword { get; set; }
    }
}
