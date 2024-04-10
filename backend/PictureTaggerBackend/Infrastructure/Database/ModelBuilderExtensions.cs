using Domain.AggregateModels.AccessAccountAggregate;
using Domain.AggregateModels.OriginalFileAggregate;
using Domain.AggregateModels.ProcessedFileAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database;

public static class ModelBuilderExtensions
{
    public static void ConfigureClassifications(this ModelBuilder builder)
    {
        builder.Entity<Classification>(
            model =>
            {
                model.ToTable("Classifications");
                model.Property<int>("Id")
                    .IsRequired()
                    .ValueGeneratedOnAdd()
                    .UseSequence();
                model.HasKey("Id");
                model.Property(m => m.Name)
                    .ValueGeneratedNever();
            });
    }
    public static void ConfigureAccessAccount(this ModelBuilder builder)
    {
        builder.Entity<AccessAccount>(
            model =>
            {
                model.ToTable("Accounts");
                model.HasKey(m => m.Id);
                model.Property(m => m.Id)
                    .ValueGeneratedNever();
                model.HasMany<OriginalFile>()
                    .WithOne(m => m.Owner)
                    .IsRequired();
                model.HasMany<ProcessedFile>()
                    .WithOne(m => m.Owner)
                    .IsRequired();
            });
    }

    public static void ConfigureOriginalFile(this ModelBuilder builder)
    {
        builder.Entity<OriginalFile>(
            model =>
            {
                model.ToTable("OriginalFiles");
                model.Property(m => m.Id)
                    .ValueGeneratedNever();
                model.Property(m => m.CreationDateTime)
                    .ValueGeneratedNever()
                    .IsRequired();
                model.HasKey(m => m.Id);
                model.OwnsOne(m => m.Metadata);
                model.OwnsOne(m => m.StorageData);
                // model.Property(m => m.Owner)
                //     .HasConversion(
                //         v => v.Id,
                //         v => AccessAccount.Create(v));
            });
    }
    
    public static void ConfigureProcessedFile(this ModelBuilder builder)
    {
        builder.Entity<ProcessedFile>(
            model =>
            {
                model.ToTable("ProcessedFiles");
                model.Property(m => m.Id)
                    .ValueGeneratedNever();
                model.HasKey(m => m.Id);
                model.Property(m => m.CreationDateTime)
                    .ValueGeneratedNever()
                    .IsRequired();
                model.OwnsOne(m => m.Metadata);
                model.OwnsOne(m => m.StorageData);
                model.OwnsOne(m => m.ServeData);

                model.HasMany(m => m.Classifications)
                    .WithMany()
                    .UsingEntity(
                        "ClassificationsToProcessedFiles",
                        right => right.HasOne(typeof(Classification))
                            .WithMany()
                            .HasForeignKey("ClassificationId")
                            .HasPrincipalKey("Id")
                            .IsRequired()
                            .OnDelete(DeleteBehavior.Cascade),
                        left => left.HasOne(typeof(ProcessedFile))
                            .WithMany()
                            .HasForeignKey("ProcessedFileId")
                            .HasPrincipalKey(nameof(ProcessedFile.Id))
                            .IsRequired()
                            .OnDelete(DeleteBehavior.Cascade),
                        join =>
                        {
                            join.HasKey("ClassificationId", "ProcessedFileId");
                        });
                
                model.Navigation(nameof(ProcessedFile.Classifications))
                    .Metadata.SetPropertyAccessMode(PropertyAccessMode.Property);
            });
    }

    private static DateTime GenerateCurrentTimestamp()
        => DateTime.UtcNow;
}