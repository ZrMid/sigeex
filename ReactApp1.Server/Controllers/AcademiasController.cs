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
    }
}
