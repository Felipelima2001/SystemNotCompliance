using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroErrosAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSetorRelationshipToErro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SetorId",
                table: "Erros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Setores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setores", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Erros_SetorId",
                table: "Erros",
                column: "SetorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Erros_Setores_SetorId",
                table: "Erros",
                column: "SetorId",
                principalTable: "Setores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Erros_Setores_SetorId",
                table: "Erros");

            migrationBuilder.DropTable(
                name: "Setores");

            migrationBuilder.DropIndex(
                name: "IX_Erros_SetorId",
                table: "Erros");

            migrationBuilder.DropColumn(
                name: "SetorId",
                table: "Erros");
        }
    }
}
