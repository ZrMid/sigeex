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

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Catalogo data)
        {
            await _dbSigeexContext.Catalogos.AddAsync(data);
            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente." });
        }

        [HttpPost]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Catalogo update)
        {
            var origin = await _dbSigeexContext.Set<Catalogo>().FindAsync(id);

            if (origin == null)
            {
                return NotFound(new { message = "UsuarioClase no encontrado." });
            }

            origin.NombreCatalogo = update.NombreCatalogo ?? origin.NombreCatalogo;

            await _dbSigeexContext.SaveChangesAsync();

            return Ok(new { message = "UsuarioClase actualizado exitosamente." });
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Catalogo fila = _dbSigeexContext.Catalogos.Find(id);

            _dbSigeexContext.Catalogos.Remove(fila);
            await _dbSigeexContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
