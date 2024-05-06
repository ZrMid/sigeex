using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.ModelsSis;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public UsuariosController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllUsers")]
        public async Task<IActionResult> AllUsers()
        {
            List<UsuariosGetTab> lista = _dbSigeexContext.UsuariosGetTabs.OrderByDescending(t => t.IdUsuario).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("LogIn")]
        public async Task<IActionResult> LogIn([FromBody] UsuarioSis login)
        {
            var usuario = await _dbSigeexContext.UsuariosGetTabs
                .Where(u => u.NombreUsuario == login.Usuario && u.Contrasena == login.Contrasena)
                .Select(u => new {
                    Usuario = u.NombreUsuario,
                    Contrasena = u.Contrasena,
                    Permiso = u.TipoUsuario
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return Ok(usuario);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Usuario us)
        {
            
            await _dbSigeexContext.Usuarios.AddAsync(us);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
            
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Usuario usuario = _dbSigeexContext.Usuarios.Find(id);

            _dbSigeexContext.Usuarios.Remove(usuario);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }

}
