using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasesController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public ClasesController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllClases")]
        public async Task<IActionResult> AllClases()
        {
            List<ClasesGetTab> lista = _dbSigeexContext.ClasesGetTabs.OrderByDescending(t => t.Idclase).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Clase data)
        {

            await _dbSigeexContext.Clases.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });

        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Clase updatedClase)
        {
            // Buscar la clase existente por ID
            var claseExistente = await _dbSigeexContext.Set<Clase>().FindAsync(id);

            if (claseExistente == null)
            {
                return NotFound(new { message = "Clase no encontrada." });
            }

            claseExistente.Idprofesor = updatedClase.Idprofesor != 0 ? updatedClase.Idprofesor : claseExistente.Idprofesor;
            claseExistente.IdplanProgramaEducativo = updatedClase.IdplanProgramaEducativo != 0 ? updatedClase.IdplanProgramaEducativo : claseExistente.IdplanProgramaEducativo;
            claseExistente.Idacademia = updatedClase.Idacademia != 0 ? updatedClase.Idacademia : claseExistente.Idacademia;
            claseExistente.Idcatalogo = updatedClase.Idcatalogo != 0 ? updatedClase.Idcatalogo : claseExistente.Idcatalogo;
            claseExistente.Idbloque = updatedClase.Idbloque != 0 ? updatedClase.Idbloque : claseExistente.Idbloque;
            claseExistente.Idmateria = updatedClase.Idmateria != 0 ? updatedClase.Idmateria : claseExistente.Idmateria;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Clase actualizada exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Clase fila = _dbSigeexContext.Clases.Find(id);

            _dbSigeexContext.Clases.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
