using Microsoft.EntityFrameworkCore;
using CadastroErrosAPI.Models;

namespace CadastroErrosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Erro> Erros { get; set; }
    }
}
