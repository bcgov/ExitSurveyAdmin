﻿// <auto-generated />
using System;
using ExitSurveyAdmin.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ExitSurveyAdmin.Migrations
{
    [DbContext(typeof(ExitSurveyAdminContext))]
    [Migration("20230131221546_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("ExitSurveyAdmin.Models.AdminSetting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreatedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AdminSettings");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address1")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Address2")
                        .HasColumnType("text");

                    b.Property<string>("AddressCity")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AddressPostCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AddressProvince")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Age")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AgeGroup")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AppointmentStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("BackDated")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Classification")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClassificationGroup")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CurrentEmployeeStatusCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DepartmentId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("EffectiveDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ExitCount")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("GovernmentEmail")
                        .HasColumnType("text");

                    b.Property<string>("GovernmentEmployeeId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("JobCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("JobFunctionCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastDayWorkedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LeaveDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LocationCity")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LocationGroup")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Ministry")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("OriginalHireDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PositionCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PositionTitle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PreferredAddress1")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("PreferredAddress1Flag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredAddress2")
                        .HasColumnType("text");

                    b.Property<bool>("PreferredAddress2Flag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredAddressCity")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("PreferredAddressCityFlag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredAddressPostCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("PreferredAddressPostCodeFlag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredAddressProvince")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("PreferredAddressProvinceFlag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredEmail")
                        .HasColumnType("text");

                    b.Property<bool>("PreferredEmailFlag")
                        .HasColumnType("boolean");

                    b.Property<string>("PreferredFirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("PreferredFirstNameFlag")
                        .HasColumnType("boolean");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RecordCount")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ServiceGroup")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ServiceYears")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Telkey")
                        .HasColumnType("text");

                    b.Property<bool>("TriedToUpdateInFinalState")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("CurrentEmployeeStatusCode");

                    b.HasIndex("GovernmentEmployeeId", "ExitCount");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.EmployeeActionEnum", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Code");

                    b.ToTable("EmployeeActionEnums");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.EmployeeStatusEnum", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Code");

                    b.ToTable("EmployeeStatusEnums");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.EmployeeTimelineEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AdminUserName")
                        .HasColumnType("text");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("EmployeeActionCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<string>("EmployeeStatusCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedTs")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeActionCode");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("EmployeeStatusCode");

                    b.ToTable("EmployeeTimelineEntries");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.TaskEnum", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Code");

                    b.ToTable("TaskEnums");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.TaskLogEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("ModifiedTs")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("TaskCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TaskOutcomeCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("TaskCode");

                    b.HasIndex("TaskOutcomeCode");

                    b.ToTable("TaskLogEntries");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.TaskOutcomeEnum", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Code");

                    b.ToTable("TaskOutcomeEnums");
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.Employee", b =>
                {
                    b.HasOne("ExitSurveyAdmin.Models.EmployeeStatusEnum", "CurrentEmployeeStatus")
                        .WithMany("Employees")
                        .HasForeignKey("CurrentEmployeeStatusCode")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.EmployeeTimelineEntry", b =>
                {
                    b.HasOne("ExitSurveyAdmin.Models.EmployeeActionEnum", "EmployeeAction")
                        .WithMany("TimelineEntries")
                        .HasForeignKey("EmployeeActionCode")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExitSurveyAdmin.Models.Employee", "Employee")
                        .WithMany("TimelineEntries")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExitSurveyAdmin.Models.EmployeeStatusEnum", "EmployeeStatus")
                        .WithMany("TimelineEntries")
                        .HasForeignKey("EmployeeStatusCode")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("ExitSurveyAdmin.Models.TaskLogEntry", b =>
                {
                    b.HasOne("ExitSurveyAdmin.Models.TaskEnum", "Task")
                        .WithMany("TaskLogEntries")
                        .HasForeignKey("TaskCode")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExitSurveyAdmin.Models.TaskOutcomeEnum", "TaskOutcome")
                        .WithMany("TaskLogEntries")
                        .HasForeignKey("TaskOutcomeCode")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
