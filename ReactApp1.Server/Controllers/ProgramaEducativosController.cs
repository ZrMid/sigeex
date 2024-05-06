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
    }
}
