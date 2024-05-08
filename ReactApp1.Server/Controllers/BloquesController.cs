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
