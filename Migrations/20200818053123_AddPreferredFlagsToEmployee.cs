﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ExitSurveyAdmin.Migrations
{
    public partial class AddPreferredFlagsToEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PreferredAddress1Flag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredAddress2Flag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredAddressCityFlag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredAddressPostCodeFlag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredAddressProvinceFlag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredEmailFlag",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PreferredFirstNameFlag",
                table: "Employees",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreferredAddress1Flag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredAddress2Flag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredAddressCityFlag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredAddressPostCodeFlag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredAddressProvinceFlag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredEmailFlag",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PreferredFirstNameFlag",
                table: "Employees");
        }
    }
}
