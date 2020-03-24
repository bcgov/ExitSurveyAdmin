using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
***REMOVED***
    public partial class UpdateEmployee : Migration
    ***REMOVED***
        protected override void Up(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.AddColumn<string>(
                name: "Address1",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address2",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressCity",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressPostCode",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressProvince",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Age",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AgeGroup",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppointmentStatus",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BackDated",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Classification",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ClassificationGroup",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DepartmentId",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "EffectiveDate",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EmployeeId",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExitCount",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GovernmentEmail",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JobCode",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JobFunctionCode",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastDayWorkedDate",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LeaveDate",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LocationCity",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocationGroup",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ministry",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "OriginalHireDate",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PositionCode",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ServiceGroup",
                table: "Employees",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ServiceYears",
                table: "Employees",
                nullable: false,
                defaultValue: "");
      ***REMOVED***

        protected override void Down(MigrationBuilder migrationBuilder)
        ***REMOVED***
            migrationBuilder.DropColumn(
                name: "Address1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Address2",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AddressCity",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AddressPostCode",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AddressProvince",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AgeGroup",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AppointmentStatus",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "BackDated",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Classification",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ClassificationGroup",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EffectiveDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ExitCount",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "GovernmentEmail",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "JobCode",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "JobFunctionCode",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LastDayWorkedDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LeaveDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LocationCity",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LocationGroup",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Ministry",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OriginalHireDate",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PositionCode",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ServiceGroup",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ServiceYears",
                table: "Employees");
      ***REMOVED***
  ***REMOVED***
***REMOVED***
