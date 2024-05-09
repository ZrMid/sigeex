using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Models;

public partial class DbSigeexContext : DbContext
{
    public DbSigeexContext()
    {
    }

    public DbSigeexContext(DbContextOptions<DbSigeexContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Academia> Academias { get; set; }

    public virtual DbSet<Bloque> Bloques { get; set; }

    public virtual DbSet<Catalogo> Catalogos { get; set; }

    public virtual DbSet<Clase> Clases { get; set; }

    public virtual DbSet<ClasesGetTab> ClasesGetTabs { get; set; }

    public virtual DbSet<Examene> Examenes { get; set; }

    public virtual DbSet<Materia> Materias { get; set; }

    public virtual DbSet<ProgramaEducativo> ProgramaEducativos { get; set; }

    public virtual DbSet<Reactivo> Reactivos { get; set; }

    public virtual DbSet<ReactivosExaman> ReactivosExamen { get; set; }

    public virtual DbSet<ReactivosRespondido> ReactivosRespondidos { get; set; }

    public virtual DbSet<TipoReactivo> TipoReactivos { get; set; }

    public virtual DbSet<TiposProfesore> TiposProfesores { get; set; }

    public virtual DbSet<TiposUsuario> TiposUsuarios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioClase> UsuarioClases { get; set; }

    public virtual DbSet<UsuarioClaseGetTab> UsuarioClaseGetTabs { get; set; }

    public virtual DbSet<UsuariosGetTab> UsuariosGetTabs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-325SEHV; Database=DbSigeex;User Id=sa;Password=123; Integrated Security=True; Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Academia>(entity =>
        {
            entity.HasKey(e => e.Idacademia).HasName("PK__Academia__BCBC7DE45720B1A1");

            entity.Property(e => e.Idacademia).HasColumnName("IDAcademia");
            entity.Property(e => e.NombreAcademia)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Bloque>(entity =>
        {
            entity.HasKey(e => e.Idbloque).HasName("PK__Bloques__0BF1524F97EB0BB1");

            entity.Property(e => e.Idbloque).HasColumnName("IDBloque");
            entity.Property(e => e.NombreBloque)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Catalogo>(entity =>
        {
            entity.HasKey(e => e.Idcatalogo).HasName("PK__Catalogo__87D110C46DFB76BA");

            entity.Property(e => e.Idcatalogo).HasColumnName("IDCatalogo");
            entity.Property(e => e.NombreCatalogo)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Clase>(entity =>
        {
            entity.HasKey(e => e.Idclase).HasName("PK__Clases__778C6D852971FE66");

            entity.Property(e => e.Idclase).HasColumnName("IDClase");
            entity.Property(e => e.Idacademia).HasColumnName("IDAcademia");
            entity.Property(e => e.Idbloque).HasColumnName("IDBloque");
            entity.Property(e => e.Idcatalogo).HasColumnName("IDCatalogo");
            entity.Property(e => e.Idmateria).HasColumnName("IDMateria");
            entity.Property(e => e.IdplanProgramaEducativo).HasColumnName("IDPlanProgramaEducativo");
            entity.Property(e => e.Idprofesor).HasColumnName("IDProfesor");
        });

        modelBuilder.Entity<ClasesGetTab>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("ClasesGetTab");

            entity.Property(e => e.Idclase).HasColumnName("IDClase");
            entity.Property(e => e.NombreAcademia)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreBloque)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreCatalogo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreMateria)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombrePlanPrograma)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Examene>(entity =>
        {
            entity.HasKey(e => e.Idexamen).HasName("PK__Examenes__DAB8C07DD5956687");

            entity.Property(e => e.Idexamen).HasColumnName("IDExamen");
            entity.Property(e => e.FechaInicio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaTermino)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Idclase).HasColumnName("IDClase");
            entity.Property(e => e.NombreExamen)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Unidad)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Materia>(entity =>
        {
            entity.HasKey(e => e.Idmateria).HasName("PK__Materia__DBEC847425D31388");

            entity.Property(e => e.Idmateria).HasColumnName("IDMateria");
            entity.Property(e => e.NombreMateria)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ProgramaEducativo>(entity =>
        {
            entity.HasKey(e => e.IdplanProgramaEducativo).HasName("PK__Planes_P__BF9F48B317B04894");

            entity.ToTable("ProgramaEducativo");

            entity.Property(e => e.IdplanProgramaEducativo).HasColumnName("IDPlanProgramaEducativo");
            entity.Property(e => e.NombrePlanPrograma)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Reactivo>(entity =>
        {
            entity.HasKey(e => e.IdtbReactivo);

            entity.Property(e => e.IdtbReactivo).HasColumnName("IDtbReactivo");
            entity.Property(e => e.Enunciado).IsUnicode(false);
            entity.Property(e => e.Idreactivo)
                .IsUnicode(false)
                .HasColumnName("IDReactivo");
            entity.Property(e => e.IdtipoReactivo).HasColumnName("IDTipoReactivo");
            entity.Property(e => e.Imagen).IsUnicode(false);
            entity.Property(e => e.RespuestaCorrecta).IsUnicode(false);
            entity.Property(e => e.Respuestas).IsUnicode(false);
        });

        modelBuilder.Entity<ReactivosExaman>(entity =>
        {
            entity.HasKey(e => e.IdreactivoExamen).HasName("PK__Reactivo__6BD472046865F7FD");

            entity.Property(e => e.IdreactivoExamen).HasColumnName("IDReactivoExamen");
            entity.Property(e => e.Idexamen).HasColumnName("IDExamen");
            entity.Property(e => e.Idreactivo).HasColumnName("IDReactivo");
            entity.Property(e => e.ValorReactivo)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ReactivosRespondido>(entity =>
        {
            entity.HasKey(e => e.IdreactivoRespondido).HasName("PK__Reactivo__7E8B12E538F6DAFE");

            entity.Property(e => e.IdreactivoRespondido).HasColumnName("IDReactivoRespondido");
            entity.Property(e => e.IdreactivoExamen).HasColumnName("IDReactivoExamen");
            entity.Property(e => e.Idusuario).HasColumnName("IDUsuario");
            entity.Property(e => e.RespuestaReactivo).IsUnicode(false);
        });

        modelBuilder.Entity<TipoReactivo>(entity =>
        {
            entity.HasKey(e => e.IdtipoReactivo).HasName("PK__Tipo_Rea__2F335BB148E7DA8B");

            entity.ToTable("Tipo_Reactivos");

            entity.Property(e => e.IdtipoReactivo).HasColumnName("IDTipoReactivo");
            entity.Property(e => e.NombreTipo)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TiposProfesore>(entity =>
        {
            entity.HasKey(e => e.IdtipoProfesor).HasName("PK__Tipos_Pr__D838E19DCFAED553");

            entity.ToTable("Tipos_Profesores");

            entity.Property(e => e.IdtipoProfesor).HasColumnName("IDTipoProfesor");
            entity.Property(e => e.TipoProfesor)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TiposUsuario>(entity =>
        {
            entity.HasKey(e => e.IdtipoUsuario).HasName("PK__Tipos_Us__53289754E359375D");

            entity.ToTable("Tipos_Usuarios");

            entity.Property(e => e.IdtipoUsuario).HasColumnName("IDTipoUsuario");
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Contrasena)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdtipoProfesor)
                .HasDefaultValueSql("((1))")
                .HasColumnName("IDTipoProfesor");
            entity.Property(e => e.IdtipoUsuario)
                .HasDefaultValueSql("((3))")
                .HasColumnName("IDTipoUsuario");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PermisoPendiente)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValueSql("('false')");
        });

        modelBuilder.Entity<UsuarioClase>(entity =>
        {
            entity.HasKey(e => e.IdusuarioClase).HasName("PK__Usuario___DEB6761E098DE49F");

            entity.ToTable("Usuario_Clases");

            entity.Property(e => e.IdusuarioClase).HasColumnName("IDUsuarioClase");
            entity.Property(e => e.Idclase).HasColumnName("IDClase");
            entity.Property(e => e.Idusuario).HasColumnName("IDUsuario");
        });

        modelBuilder.Entity<UsuarioClaseGetTab>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("UsuarioClaseGetTab");

            entity.Property(e => e.Idclase).HasColumnName("IDClase");
            entity.Property(e => e.IdusuarioClase).HasColumnName("IDUsuarioClase");
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UsuariosGetTab>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("UsuariosGetTab");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Contrasena)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PermisoPendiente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TipoProfesor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
