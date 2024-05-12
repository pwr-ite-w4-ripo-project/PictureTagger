using Domain.AggregateModels.AccessAccountAggregate;

namespace Domain.AggregateModels.ProcessedFileAggregate;

public sealed class ProcessedFile : UniqueEntity, IProcessedFile
{
    private HashSet<Classification> _classifications;

    public StorageData StorageData { get; }
    public ServeData ServeData { get; set; }
    public Metadata Metadata { get; }
    public AccessAccount Owner { get; }

    public IReadOnlySet<Classification> Classifications 
    {
        get => _classifications;
        private set => _classifications = new HashSet<Classification>(value);  // overrides efcore's LegacyReferenceComparer
    }

    public void SetClassifications(ICollection<Classification> newCollection)
        => _classifications = new HashSet<Classification>(newCollection);
    
    public ProcessedFile(
        AccessAccount owner,
        Metadata metadata,
        StorageData storageData,
        ServeData serveData,
        ICollection<Classification> classifications
    )
        => (Owner, Metadata, StorageData, ServeData, _classifications) = (owner, metadata, storageData, serveData, new(classifications));

#pragma warning disable CS8618
    private ProcessedFile() { }
#pragma warning restore CS8618

    public void Add(Classification classification)
        => _classifications.Add(classification);

    public void Add(ICollection<Classification> classifications)
        => _classifications.UnionWith(classifications);

    public void Remove(ICollection<Classification> classifications)
        => _classifications.RemoveWhere(classifications.Contains);
}