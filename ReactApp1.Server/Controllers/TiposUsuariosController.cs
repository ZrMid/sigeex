using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;
using ReactApp1.Server.ModelsSis;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposUsuariosController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public TiposUsuariosController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllTypeUsers")]
        public async Task<IActionResult> AllTypeUsers()
        {
            List<TiposUsuario> lista = _dbSigeexContext.TiposUsuarios.OrderByDescending(t => t.IdtipoUsuario).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            TiposUsuario fila = _dbSigeexContext.TiposUsuarios.Find(id);

            _dbSigeexContext.TiposUsuarios.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
