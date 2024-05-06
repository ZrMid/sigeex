using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class ReactivosRespondido
{
    public int IdreactivoRespondido { get; set; }

    public int Idusuario { get; set; }

    public int IdreactivoExamen { get; set; }

    public string RespuestaReactivo { get; set; } = null!;

    public int Calificacion { get; set; }
}
