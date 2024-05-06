using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public int? IdtipoUsuario { get; set; }

    public int? IdtipoProfesor { get; set; }

    public string? PermisoPendiente { get; set; }
}
