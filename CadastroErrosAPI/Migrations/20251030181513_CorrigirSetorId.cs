using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroErrosAPI.Migrations
{
    /// <inheritdoc />
    public partial class CorrigirSetorId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SetorId",
                table: "Setores",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "SetorId",
                table: "Erros",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Setores",
                newName: "SetorId");

            migrationBuilder.AlterColumn<int>(
                name: "SetorId",
                table: "Erros",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
