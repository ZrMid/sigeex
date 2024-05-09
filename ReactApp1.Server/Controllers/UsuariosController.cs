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

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar([FromBody] Usuario us, int id)
        {
            var usuarioExistente = await _dbSigeexContext.Usuarios.FindAsync(id);

            if (usuarioExistente == null)
            {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            usuarioExistente.NombreUsuario = us.NombreUsuario ?? usuarioExistente.NombreUsuario;
            usuarioExistente.Contrasena = us.Contrasena ?? usuarioExistente.Contrasena;
            usuarioExistente.Nombre = us.Nombre ?? usuarioExistente.Nombre;
            usuarioExistente.Apellido = us.Apellido ?? usuarioExistente.Apellido;
            usuarioExistente.Correo = us.Correo ?? usuarioExistente.Correo;
            usuarioExistente.IdtipoUsuario = us.IdtipoUsuario ?? usuarioExistente.IdtipoUsuario;
            usuarioExistente.IdtipoProfesor = us.IdtipoProfesor ?? usuarioExistente.IdtipoProfesor;
            usuarioExistente.PermisoPendiente = us.PermisoPendiente ?? usuarioExistente.PermisoPendiente;

            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { message = "Usuario actualizado exitosamente." });
        }


        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Usuario fila = _dbSigeexContext.Usuarios.Find(id);

            _dbSigeexContext.Usuarios.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }

}
