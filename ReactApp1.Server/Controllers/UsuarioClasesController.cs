using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioClasesController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public UsuarioClasesController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllUsuarioClases")]
        public async Task<IActionResult> AllUsuarioClases()
        {
            List<UsuarioClaseGetTab> lista = _dbSigeexContext.UsuarioClaseGetTabs.OrderByDescending(t => t.IdusuarioClase).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UsuarioClase data)
        {

            await _dbSigeexContext.UsuarioClases.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });

        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] UsuarioClase updatedUsuarioClase)
        {
            var usuarioClaseExistente = await _dbSigeexContext.Set<UsuarioClase>().FindAsync(id);

            if (usuarioClaseExistente == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            usuarioClaseExistente.Idusuario = updatedUsuarioClase.Idusuario != 0 ? updatedUsuarioClase.Idusuario : usuarioClaseExistente.Idusuario;
            usuarioClaseExistente.Idclase = updatedUsuarioClase.Idclase != 0 ? updatedUsuarioClase.Idclase : usuarioClaseExistente.Idclase;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            UsuarioClase fila = _dbSigeexContext.UsuarioClases.Find(id);

            _dbSigeexContext.UsuarioClases.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
