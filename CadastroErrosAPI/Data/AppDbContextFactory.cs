using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using CadastroErrosAPI.Data;

namespace CadastroErrosAPI.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-1MQTRJM\\SQLSERVER;Database=CadastroErrosDB;Trusted_Connection=True;");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
