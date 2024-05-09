using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloquesController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public BloquesController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllBloques")]
        public async Task<IActionResult> AllBloques()
        {
            List<Bloque> lista = _dbSigeexContext.Bloques.OrderByDescending(t => t.Idbloque).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Bloque data)
        {
            await _dbSigeexContext.Bloques.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Bloque update)
        {
            var origin = await _dbSigeexContext.Set<Bloque>().FindAsync(id);

            if (origin == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            origin.NombreBloque = update.NombreBloque ?? origin.NombreBloque;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Bloque fila = _dbSigeexContext.Bloques.Find(id);

            _dbSigeexContext.Bloques.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
