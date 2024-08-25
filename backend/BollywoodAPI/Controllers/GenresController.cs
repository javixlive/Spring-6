using BollywoodAPI.Data;
using BollywoodAPI.Models;
using BollywoodAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BollywoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public GenresController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllGenres()
        {
            var allGenres = dbContext.Genre.ToList();

            return Ok(allGenres);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult getGenreById(int id)
        {
            var genre = dbContext.Genre.Find(id);

            if (genre == null)
            {
                return NotFound();
            }
            return Ok(genre);
        }

        [HttpPost]
        public IActionResult AddGenre(AddGenreDto AddGenreDto)
        {
            var userEntity = new Genre()
            {
                title = AddGenreDto.title
            };

            dbContext.Genre.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult updateGenre(int id, UpdateGenreDto updateGenre)
        {
            var genre = dbContext.Genre.Find(id);

            if (genre == null)
            {
                return NotFound();
            }
            genre.title = updateGenre.title;
            dbContext.SaveChanges();
            return Ok(genre);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteGenre(int id)
        {
            var genre = dbContext.Genre.Find(id);

            if (genre == null)
            {
                return NotFound();
            }
            dbContext.Genre.Remove(genre);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
