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
    }
}
