using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
***REMOVED***
    public partial class InitialCreate : Migration
    ***REMOVED***
        protected override void Up(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                ***REMOVED***
                    Id = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                ***REMOVED***
                    Id = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_Employees", x => x.Id);
              ***REMOVED***);
      ***REMOVED***

        protected override void Down(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "Employees");
      ***REMOVED***
  ***REMOVED***
***REMOVED***
