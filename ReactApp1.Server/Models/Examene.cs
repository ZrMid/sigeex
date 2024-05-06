using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class Examene
{
    public int Idexamen { get; set; }

    public int Idclase { get; set; }

    public string NombreExamen { get; set; } = null!;

    public string Unidad { get; set; } = null!;

    public string FechaInicio { get; set; } = null!;

    public string FechaTermino { get; set; } = null!;
}
