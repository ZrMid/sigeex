using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramaEducativosController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public ProgramaEducativosController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllProgramaEducativos")]
        public async Task<IActionResult> ProgramaEducativos()
        {
            List<ProgramaEducativo> lista = _dbSigeexContext.ProgramaEducativos.OrderByDescending(t => t.IdplanProgramaEducativo).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] ProgramaEducativo data)
        {
            await _dbSigeexContext.ProgramaEducativos.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] ProgramaEducativo update)
        {
            var origin = await _dbSigeexContext.Set<ProgramaEducativo>().FindAsync(id);

            if (origin == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            origin.NombrePlanPrograma = update.NombrePlanPrograma ?? origin.NombrePlanPrograma;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            ProgramaEducativo fila = _dbSigeexContext.ProgramaEducativos.Find(id);

            _dbSigeexContext.ProgramaEducativos.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
