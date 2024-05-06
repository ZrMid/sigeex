using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogosController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public CatalogosController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllCatalogos")]
        public async Task<IActionResult> AllCatalogos()
        {
            List<Catalogo> lista = _dbSigeexContext.Catalogos.OrderByDescending(t => t.Idcatalogo).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
