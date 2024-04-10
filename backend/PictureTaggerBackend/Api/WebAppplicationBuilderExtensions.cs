using Domain.AggregateModels;
using Domain.AggregateModels.OriginalFileAggregate;
using Domain.AggregateModels.ProcessedFileAggregate;
using Domain.SeedWork.Services.Amqp;
using Infrastructure.Amqp;
using Infrastructure.Database;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;

namespace Api;

public static class WebApplicationBuilderExtensions
{
    public static void ConfigureDatabase(this WebApplicationBuilder builder)
    {
        var options = new DbContextOptionsBuilder<ObjectDetectionDbContext>()
            .UseNpgsql(builder.Configuration.GetConnectionString("ObjectDetectionDb"), b => b.MigrationsAssembly("Infrastructure"))
            .LogTo(Console.WriteLine, LogLevel.Information)
            .Options;
        
        builder.Services.AddTransient<DbContextOptions<ObjectDetectionDbContext>>(_ => options);
        builder.Services.AddDbContext<ObjectDetectionDbContext>();
        
        // new ObjectDetectionDbContext(options).Database.Migrate();
    }

    public static void ConfigureRepositories(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IFileRepository<OriginalFile>, OriginalFilesRepository>();
        builder.Services.AddTransient<IFileRepository<ProcessedFile>, ProcessedFilesRepository>();
        builder.Services.AddTransient<IProcessedFileRepository, ProcessedFilesRepository>();
    }

    public static void ConfigureAmqp(this WebApplicationBuilder builder)
    {
        var amqpConnectionString = builder.Configuration.GetConnectionString("Amqp");

        if (amqpConnectionString is null)
        {
            throw new ArgumentNullException(nameof(amqpConnectionString));
        }

        var amqp = amqpConnectionString.Split(";")
            .Select(keyValuePair => keyValuePair.Split("="))
            .ToDictionary(keyValuePair => keyValuePair[0], keyValuePair => keyValuePair[1]);
        
        builder.Services.AddSingleton<IAmqpService, RabbitMq>(_ => RabbitMq.Connect(
            new ConnectionFactory
            {
                UserName = amqp["Username"],
                Password = amqp["Password"],
                HostName = amqp["Host"],
                Port = Convert.ToInt32(amqp["Port"]),
                ClientProvidedName = amqp["ProvidedName"]
            }));
    }
}
