using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
***REMOVED***
    public partial class InitialCreate : Migration
    ***REMOVED***
        protected override void Up(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.CreateTable(
                name: "EmployeeActionEnums",
                columns: table => new
                ***REMOVED***
                    Code = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_EmployeeActionEnums", x => x.Code);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "EmployeeStatusEnums",
                columns: table => new
                ***REMOVED***
                    Code = table.Column<string>(nullable: false),
                    State = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_EmployeeStatusEnums", x => x.Code);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "TaskEnums",
                columns: table => new
                ***REMOVED***
                    Code = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_TaskEnums", x => x.Code);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "TaskOutcomeEnums",
                columns: table => new
                ***REMOVED***
                    Code = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_TaskOutcomeEnums", x => x.Code);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                ***REMOVED***
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTs = table.Column<DateTime>(nullable: false),
                    ModifiedTs = table.Column<DateTime>(nullable: false),
                    Telkey = table.Column<string>(nullable: true),
                    GovernmentEmployeeId = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    PreferredFirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    RecordCount = table.Column<string>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<string>(nullable: false),
                    GovernmentEmail = table.Column<string>(nullable: true),
                    PreferredEmail = table.Column<string>(nullable: true),
                    Classification = table.Column<string>(nullable: false),
                    Ministry = table.Column<string>(nullable: false),
                    DepartmentId = table.Column<string>(nullable: false),
                    JobFunctionCode = table.Column<string>(nullable: false),
                    LocationCity = table.Column<string>(nullable: false),
                    OriginalHireDate = table.Column<DateTime>(nullable: false),
                    LastDayWorkedDate = table.Column<DateTime>(nullable: true),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    Reason = table.Column<string>(nullable: false),
                    Address1 = table.Column<string>(nullable: false),
                    Address2 = table.Column<string>(nullable: true),
                    AddressCity = table.Column<string>(nullable: false),
                    AddressProvince = table.Column<string>(nullable: false),
                    AddressPostCode = table.Column<string>(nullable: false),
                    PreferredAddress1 = table.Column<string>(nullable: false),
                    PreferredAddress2 = table.Column<string>(nullable: true),
                    PreferredAddressCity = table.Column<string>(nullable: false),
                    PreferredAddressProvince = table.Column<string>(nullable: false),
                    PreferredAddressPostCode = table.Column<string>(nullable: false),
                    Phone = table.Column<string>(nullable: false),
                    AppointmentStatus = table.Column<string>(nullable: false),
                    PositionCode = table.Column<string>(nullable: false),
                    PositionTitle = table.Column<string>(nullable: false),
                    Age = table.Column<string>(nullable: false),
                    LeaveDate = table.Column<DateTime>(nullable: true),
                    ServiceYears = table.Column<string>(nullable: false),
                    JobCode = table.Column<string>(nullable: false),
                    BackDated = table.Column<string>(nullable: false),
                    ExitCount = table.Column<string>(nullable: false),
                    AgeGroup = table.Column<string>(nullable: false),
                    ClassificationGroup = table.Column<string>(nullable: false),
                    ServiceGroup = table.Column<string>(nullable: false),
                    LocationGroup = table.Column<string>(nullable: false),
                    CurrentEmployeeStatusCode = table.Column<string>(nullable: false),
                    TriedToUpdateInFinalState = table.Column<bool>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeStatusEnums_CurrentEmployeeStatusCode",
                        column: x => x.CurrentEmployeeStatusCode,
                        principalTable: "EmployeeStatusEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "TaskLogEntries",
                columns: table => new
                ***REMOVED***
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTs = table.Column<DateTime>(nullable: false),
                    ModifiedTs = table.Column<DateTime>(nullable: false),
                    TaskCode = table.Column<string>(nullable: false),
                    TaskOutcomeCode = table.Column<string>(nullable: false),
                    Comment = table.Column<string>(nullable: false)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_TaskLogEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskLogEntries_TaskEnums_TaskCode",
                        column: x => x.TaskCode,
                        principalTable: "TaskEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskLogEntries_TaskOutcomeEnums_TaskOutcomeCode",
                        column: x => x.TaskOutcomeCode,
                        principalTable: "TaskOutcomeEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
              ***REMOVED***);

            migrationBuilder.CreateTable(
                name: "EmployeeTimelineEntries",
                columns: table => new
                ***REMOVED***
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTs = table.Column<DateTime>(nullable: false),
                    ModifiedTs = table.Column<DateTime>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: false),
                    EmployeeActionCode = table.Column<string>(nullable: false),
                    EmployeeStatusCode = table.Column<string>(nullable: false),
                    Comment = table.Column<string>(nullable: false),
                    AdminUserName = table.Column<string>(nullable: true)
              ***REMOVED***
                constraints: table =>
                ***REMOVED***
                    table.PrimaryKey("PK_EmployeeTimelineEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeTimelineEntries_EmployeeActionEnums_EmployeeActionCode",
                        column: x => x.EmployeeActionCode,
                        principalTable: "EmployeeActionEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTimelineEntries_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTimelineEntries_EmployeeStatusEnums_EmployeeStatusCode",
                        column: x => x.EmployeeStatusCode,
                        principalTable: "EmployeeStatusEnums",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
              ***REMOVED***);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CurrentEmployeeStatusCode",
                table: "Employees",
                column: "CurrentEmployeeStatusCode");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_GovernmentEmployeeId_ExitCount",
                table: "Employees",
                columns: new[] ***REMOVED*** "GovernmentEmployeeId", "ExitCount" ***REMOVED***);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTimelineEntries_EmployeeActionCode",
                table: "EmployeeTimelineEntries",
                column: "EmployeeActionCode");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTimelineEntries_EmployeeId",
                table: "EmployeeTimelineEntries",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTimelineEntries_EmployeeStatusCode",
                table: "EmployeeTimelineEntries",
                column: "EmployeeStatusCode");

            migrationBuilder.CreateIndex(
                name: "IX_TaskLogEntries_TaskCode",
                table: "TaskLogEntries",
                column: "TaskCode");

            migrationBuilder.CreateIndex(
                name: "IX_TaskLogEntries_TaskOutcomeCode",
                table: "TaskLogEntries",
                column: "TaskOutcomeCode");
      ***REMOVED***

        protected override void Down(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.DropTable(
                name: "EmployeeTimelineEntries");

            migrationBuilder.DropTable(
                name: "TaskLogEntries");

            migrationBuilder.DropTable(
                name: "EmployeeActionEnums");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "TaskEnums");

            migrationBuilder.DropTable(
                name: "TaskOutcomeEnums");

            migrationBuilder.DropTable(
                name: "EmployeeStatusEnums");
      ***REMOVED***
  ***REMOVED***
***REMOVED***
