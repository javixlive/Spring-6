using BollywoodAPI.Data;
using BollywoodAPI.Models;
using BollywoodAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BollywoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public MoviesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllMovies()
        {
            var allMovies = dbContext.Movie.ToList();

            return Ok(allMovies);
        }

        [HttpGet]
        [Route("{id:guid}")]

        public IActionResult getMovieById(Guid id)
        {
            var movie = dbContext.Movie.Find(id);

            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        [HttpPost]
        public IActionResult addMovie(AddMovieDto addMovieDto)
        {
            var userEntity = new Movie()
            {
                title = addMovieDto.title,
                overview = addMovieDto.overview,
                release_date = addMovieDto.release_date,
                vote_average = addMovieDto.vote_average,
                vote_count = addMovieDto.vote_count,
                poster_path = addMovieDto.poster_path,
                original_language = addMovieDto.original_language,
                genreId = addMovieDto.genreId
            };
            dbContext.Movie.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult updateMovie(Guid id, UpdateMovieDto updateMovie)
        {
            var movie = dbContext.Movie.Find(id);

            if (movie == null)
            {
                return NotFound();
            }
            movie.title = updateMovie.title;
            movie.overview = updateMovie.overview;
            movie.release_date = updateMovie.release_date;
            movie.vote_average = updateMovie.vote_average;
            movie.vote_count = updateMovie.vote_count;
            movie.poster_path = updateMovie.poster_path;
            movie.original_language = updateMovie.original_language;
            movie.genreId = updateMovie.genreId;
            dbContext.SaveChanges();
            return Ok(movie);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteMovie (Guid id)
        {
            var movie = dbContext.Movie.Find(id);

            if (movie == null)
            {
                return NotFound();
            }
            dbContext.Movie.Remove(movie);
            dbContext.SaveChanges();
            return Ok();
        }

    }
}
