using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedTs = table.Column<DateTime>(nullable: false),
                    ModifiedTs = table.Column<DateTime>(nullable: false),
                    EmployeeId = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    LastLoginTs = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeStatusEnums",
                columns: table => new
                {
                    Code = table.Column<string>(nullable: false),
                    State = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeStatusEnums", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CreatedTs = table.Column<DateTime>(nullable: false),
                    ModifiedTs = table.Column<DateTime>(nullable: false),
                    EmployeeId = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<string>(nullable: false),
                    GovernmentEmail = table.Column<string>(nullable: false),
                    Classification = table.Column<string>(nullable: false),
                    Ministry = table.Column<string>(nullable: false),
                    DepartmentId = table.Column<string>(nullable: false),
                    JobFunctionCode = table.Column<string>(nullable: false),
                    LocationCity = table.Column<string>(nullable: false),
                    OriginalHireDate = table.Column<DateTime>(nullable: false),
                    LastDayWorkedDate = table.Column<DateTime>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    Reason = table.Column<string>(nullable: false),
                    Address1 = table.Column<string>(nullable: false),
                    Address2 = table.Column<string>(nullable: false),
                    AddressCity = table.Column<string>(nullable: false),
                    AddressProvince = table.Column<string>(nullable: false),
                    AddressPostCode = table.Column<string>(nullable: false),
                    Phone = table.Column<string>(nullable: false),
                    AppointmentStatus = table.Column<string>(nullable: false),
                    PositionCode = table.Column<string>(nullable: false),
                    Age = table.Column<string>(nullable: false),
                    LeaveDate = table.Column<DateTime>(nullable: false),
                    ServiceYears = table.Column<string>(nullable: false),
                    JobCode = table.Column<string>(nullable: false),
                    BackDated = table.Column<string>(nullable: false),
                    ExitCount = table.Column<string>(nullable: false),
                    AgeGroup = table.Column<string>(nullable: false),
                    ClassificationGroup = table.Column<string>(nullable: false),
                    ServiceGroup = table.Column<string>(nullable: false),
                    LocationGroup = table.Column<string>(nullable: false),
                    CurrentEmployeeStatusCode = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeStatusEnums_CurrentEmployeeStatusCode",
                        column: x => x.CurrentEmployeeStatusCode,
                        principalTable: "EmployeeStatusEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CurrentEmployeeStatusCode",
                table: "Employees",
                column: "CurrentEmployeeStatusCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "EmployeeStatusEnums");
        }
    }
}
