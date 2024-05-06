namespace ReactApp1.Server.ModelsSis
{
    public class UsuarioSis
    {
        public string Usuario { get; set; } 
        public string Contrasena { get; set; } 

        public UsuarioSis(string usuario, string contrasena)
        {
            Usuario = usuario;
            Contrasena = contrasena;
        }
    }

}
