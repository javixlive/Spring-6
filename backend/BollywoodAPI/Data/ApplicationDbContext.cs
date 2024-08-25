using BollywoodAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BollywoodAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
        }
        //Add Entities here 
        public DbSet<User> User { get; set; }
        public DbSet<Movie> Movie { get; set; }
        public DbSet<Genre> Genre {  get; set; }
        public DbSet<Favorites> Favorites { get; set; }
    }
}
