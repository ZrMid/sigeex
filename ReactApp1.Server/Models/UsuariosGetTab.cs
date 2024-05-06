using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class UsuariosGetTab
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? TipoUsuario { get; set; }

    public string? TipoProfesor { get; set; }

    public string? PermisoPendiente { get; set; }
}
