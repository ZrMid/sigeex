using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public MateriasController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllMaterias")]
        public async Task<IActionResult> AllMaterias()
        {
            List<Materia> lista = _dbSigeexContext.Materias.OrderByDescending(t => t.Idmateria).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Materia data)
        {
            await _dbSigeexContext.Materias.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Materia update)
        {
            var origin = await _dbSigeexContext.Set<Materia>().FindAsync(id);

            if (origin == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            origin.NombreMateria = update.NombreMateria ?? origin.NombreMateria;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Materia fila = _dbSigeexContext.Materias.Find(id);

            _dbSigeexContext.Materias.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
