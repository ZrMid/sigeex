using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademiasController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public AcademiasController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllAcademias")]
        public async Task<IActionResult> AllAcademias()
        {
            List<Academia> lista = _dbSigeexContext.Academias.OrderByDescending(t => t.Idacademia).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Academia data)
        {
            await _dbSigeexContext.Academias.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Academia update)
        {
            var origin = await _dbSigeexContext.Set<Academia>().FindAsync(id);

            if (origin == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            origin.NombreAcademia = update.NombreAcademia ?? origin.NombreAcademia;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Academia fila = _dbSigeexContext.Academias.Find(id);

            _dbSigeexContext.Academias.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
