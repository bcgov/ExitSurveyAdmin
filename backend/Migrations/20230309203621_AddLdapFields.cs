using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
{
    public partial class AddLdapFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LocationGroup",
                table: "Employees",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "LdapCity",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LdapEmail",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LdapFirstName",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LdapLastName",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LdapCity",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LdapEmail",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LdapFirstName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LdapLastName",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "LocationGroup",
                table: "Employees",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
