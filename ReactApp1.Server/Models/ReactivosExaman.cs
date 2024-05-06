using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class ReactivosExaman
{
    public int IdreactivoExamen { get; set; }

    public int Idexamen { get; set; }

    public int Idreactivo { get; set; }

    public string ValorReactivo { get; set; } = null!;
}
