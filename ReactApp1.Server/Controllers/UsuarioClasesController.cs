using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            List<UsuarioClase> lista = _dbSigeexContext.UsuarioClases.OrderByDescending(t => t.IdusuarioClase).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
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
