using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "ClassificationSequence");

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Classifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('\"ClassificationSequence\"')"),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OriginalFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Metadata_Name = table.Column<string>(type: "text", nullable: false),
                    Metadata_Type = table.Column<int>(type: "integer", nullable: false),
                    StorageData_StorageType = table.Column<int>(type: "integer", nullable: false),
                    StorageData_Uri = table.Column<string>(type: "text", nullable: false),
                    OwnerId = table.Column<string>(type: "text", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OriginalFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OriginalFiles_Accounts_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcessedFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StorageData_StorageType = table.Column<int>(type: "integer", nullable: false),
                    StorageData_Uri = table.Column<string>(type: "text", nullable: false),
                    ServeData_Url = table.Column<string>(type: "text", nullable: false),
                    Metadata_Name = table.Column<string>(type: "text", nullable: false),
                    Metadata_Type = table.Column<int>(type: "integer", nullable: false),
                    OwnerId = table.Column<string>(type: "text", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessedFiles_Accounts_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassificationsToProcessedFiles",
                columns: table => new
                {
                    ClassificationId = table.Column<int>(type: "integer", nullable: false),
                    ProcessedFileId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassificationsToProcessedFiles", x => new { x.ClassificationId, x.ProcessedFileId });
                    table.ForeignKey(
                        name: "FK_ClassificationsToProcessedFiles_Classifications_Classificat~",
                        column: x => x.ClassificationId,
                        principalTable: "Classifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassificationsToProcessedFiles_ProcessedFiles_ProcessedFil~",
                        column: x => x.ProcessedFileId,
                        principalTable: "ProcessedFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassificationsToProcessedFiles_ProcessedFileId",
                table: "ClassificationsToProcessedFiles",
                column: "ProcessedFileId");

            migrationBuilder.CreateIndex(
                name: "IX_OriginalFiles_OwnerId",
                table: "OriginalFiles",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedFiles_OwnerId",
                table: "ProcessedFiles",
                column: "OwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassificationsToProcessedFiles");

            migrationBuilder.DropTable(
                name: "OriginalFiles");

            migrationBuilder.DropTable(
                name: "Classifications");

            migrationBuilder.DropTable(
                name: "ProcessedFiles");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropSequence(
                name: "ClassificationSequence");
        }
    }
}
