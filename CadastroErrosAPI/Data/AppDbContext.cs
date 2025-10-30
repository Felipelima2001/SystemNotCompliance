using Microsoft.EntityFrameworkCore;
using CadastroErrosAPI.Models;

namespace CadastroErrosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Erro> Erros { get; set; }
        public DbSet<Setor> Setores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Erro>()
                .HasOne(e => e.Setor)
                .WithMany(s => s.Erros)
                .HasForeignKey(e => e.SetorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
