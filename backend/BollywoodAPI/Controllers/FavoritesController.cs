using BollywoodAPI.Data;
using BollywoodAPI.Models;
using BollywoodAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BollywoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public FavoritesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllFavorites()
        {
            var allFavorites = dbContext.Favorites.ToList();

            return Ok(allFavorites);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult getFavoritesById(Guid id)
        {
            var favorites = dbContext.Favorites.Find(id);

            if (favorites == null)
            {
                return NotFound();
            }
            return Ok(favorites);
        }

        [HttpPost]
        public IActionResult AddFavorites(AddFavoritesDto AddFavoritesDto)
        {
            var userEntity = new Favorites()
            {
                userId = AddFavoritesDto.userId,
                movieId = AddFavoritesDto.movieId,
            };

            dbContext.Favorites.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);
        }

        [HttpPost]
        [Route("findFavorites")]
        public IActionResult findMyFavorites(FindFavorites findFavorites)
        {
            var entity = new Favorites()
            {
                userId = findFavorites.userId,
                movieId = findFavorites.movieId,
            };

            //string query = @"
            //    Select 
            //    title, overview, release_date, vote_average, vote_count, poster_path, original_language, genreId 
            //    FROM [dbo].[Favorites]
            //    LEFT JOIN dbo.Movie On Favorites.movieId = Movie.movieId
            //    LEFT JOIN [dbo].[User] On Favorites.userId = [dbo].[User].userId
            //    WHERE Favorites.userId = @userId
            // ";
            //var parameters = new[]
            //{
            //    new SqlParameter("@userId", entity.userId)
            //};
            var data = dbContext.Favorites.Select(s => entity).ToList();
            return Ok(data);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateFavorites(Guid id, UpdateFavoritesDto updateFavorites)
        {
            var favorite = dbContext.Favorites.Find(id);
            if (favorite == null)
            {
                return NotFound();
            }

            favorite.userId = updateFavorites.userId;
            favorite.movieId = updateFavorites.movieId;
            dbContext.SaveChanges();
            return Ok(favorite);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteFavorites(Guid id)
        {
            var favorite = dbContext.Favorites.Find(id);
            if (favorite == null)
            {
                return NotFound();
            }

            dbContext.Favorites.Remove(favorite);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
