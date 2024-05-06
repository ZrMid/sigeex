using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            List<Clase> lista = _dbSigeexContext.Clases.OrderByDescending(t => t.Idclase).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
