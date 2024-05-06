using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class Reactivo
{
    public int IdtbReactivo { get; set; }

    public string Idreactivo { get; set; } = null!;

    public string Enunciado { get; set; } = null!;

    public string Respuestas { get; set; } = null!;

    public string RespuestaCorrecta { get; set; } = null!;

    public string? Imagen { get; set; }

    public int IdtipoReactivo { get; set; }
}
