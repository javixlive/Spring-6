using BollywoodAPI.Data;
using BollywoodAPI.Models;
using BollywoodAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace BollywoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public UsersController(ApplicationDbContext dbContext) 
        { 
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = dbContext.User.ToList();

            return Ok(allUsers);
        }

        [HttpGet]
        [Route("{id:guid}")]

        public IActionResult GetUserById(Guid id)
        {
            var user = dbContext.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(AddUserDto addUserDto)
        {
            var userEntity = new User()
            {
                userName = addUserDto.userName,
                userEmail = addUserDto.userEmail,
                userPassword = addUserDto.userPassword
            };

            dbContext.User.Add(userEntity);
            dbContext.SaveChanges();
            return Ok(userEntity);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateUser(Guid id, UpdateUserDto updateUser)
        {
            var user = dbContext.User.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            user.userName = updateUser.userName;
            user.userEmail = updateUser.userEmail;
            user.userPassword = updateUser.userPassword;
            dbContext.SaveChanges();
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = dbContext.User.Find(id);
            if (user == null) 
            {
                return NotFound();
            }

            dbContext.User.Remove(user);
            dbContext.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public IActionResult login(LoginUser LoginUser)
        {
            var userEntity = new User()
            {
                userEmail = LoginUser.userEmail,
                userPassword = LoginUser.userPassword
            };
            //FisttOrDefault can be use to search without the need of primary key
            var exists = dbContext.User.FirstOrDefault(person => person.userEmail == userEntity.userEmail);
            if (exists == null) 
            {
                //usermail doesn't exist
                return NotFound();
            }
            if (exists.userPassword == userEntity.userPassword)
            {
                //return (exists.userID.ToString());
                return Ok(exists);
            }
                //wrong password
            return NotFound();

        }
    }
}
