﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposProfesoresController : ControllerBase
    {
        private readonly DbSigeexContext _dbSigeexContext;

        public TiposProfesoresController(DbSigeexContext dbSigeexContext)
        {
            _dbSigeexContext = dbSigeexContext;
        }

        [HttpGet]
        [Route("AllTypeProfesores")]
        public async Task<IActionResult> AllTypeProfesores()
        {
            List<TiposProfesore> lista = _dbSigeexContext.TiposProfesores.OrderByDescending(t => t.IdtipoProfesor).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
