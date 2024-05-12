using Domain.AggregateModels.AccessAccountAggregate;
using Domain.AggregateModels.ProcessedFileAggregate;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

internal static class UtilQueries
{
    public static async Task<bool> CheckIfExists(ObjectDetectionDbContext dbContext, AccessAccount account)
    {
        var existing = await dbContext.AccessAccounts
            .AsNoTracking()
            .Where(acc => acc.Equals(account))
            .FirstOrDefaultAsync();

        return existing is not null;
    }
    
    public static Task<List<Classification>> GetExistingClassifications(ObjectDetectionDbContext dbContext, ICollection<Classification> classifications)
        => dbContext.Classifications
            .AsNoTracking()
            .Where(c => classifications.Contains(c))
            .ToListAsync();
    
    public static Task<List<AccessAccount>> GetExistingAccounts(ObjectDetectionDbContext dbContext, ICollection<AccessAccount> accounts)
        => dbContext.AccessAccounts
            .AsNoTracking()
            .Where(account => accounts.Contains(account))
            .ToListAsync();
}