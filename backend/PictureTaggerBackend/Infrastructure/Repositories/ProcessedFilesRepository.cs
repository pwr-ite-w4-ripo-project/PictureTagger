using Domain.AggregateModels.AccessAccountAggregate;
using Domain.AggregateModels.OriginalFileAggregate;
using Domain.AggregateModels.ProcessedFileAggregate;
using Domain.SeedWork.Enums;
using Domain.SeedWork.Interfaces;
using Infrastructure.Database;
using Infrastructure.Repositories.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public sealed class ProcessedFilesRepository : BaseRepository, IProcessedFileRepository
{
    public ProcessedFilesRepository(ObjectDetectionDbContext dbContext) : base(dbContext) { }
    
    public async Task AddAsync(ProcessedFile entity)
    {
        var accountExists = await UtilQueries.CheckIfExists(DbContext, entity.Owner);
        if (accountExists)
        {
            DbContext.Attach(entity.Owner);
        }
        
        var existingAccounts = await UtilQueries.GetExistingClassifications(
            DbContext,
            entity.Classifications);
        
        DbContext.AttachRange(entity.Classifications.Where(viewer => existingAccounts.Contains(viewer)));
        
        DbContext.ProcessedFiles.Add(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(ProcessedFile entity)
    {
        DbContext.ProcessedFiles.Remove(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task<(int totalCount, List<ProcessedFile> files)> GetManyAsync(AccessAccount owner, QueryMediaTypes mediaTypes, Func<IFilePaginationBuilder<ProcessedFile>, IFilePaginationBuilder<ProcessedFile>> configurePagination)
    {
        var query = DbContext.ProcessedFiles
            .Where(file => file.Owner.Equals(owner));
        
        query = mediaTypes switch
        {
            QueryMediaTypes.Images => query.Where(file => file.Metadata.Type.Equals(MediaTypes.Image)),
            QueryMediaTypes.Videos => query.Where(file => file.Metadata.Type.Equals(MediaTypes.Video)),
            _ => query
        };
        
        query = query.Include(file => file.Owner);
        
        var totalCount = await query.CountAsync();
        var files = await configurePagination(new FilePaginationBuilder<ProcessedFile>(query))
            .Build()
            .ToListAsync();
        
        return (totalCount, files);
    }

    public Task<ProcessedFile?> GetAsync(Guid id)
        => DbContext.ProcessedFiles
            .Where(file => file.Id.Equals(id))
            .FirstOrDefaultAsync();
}