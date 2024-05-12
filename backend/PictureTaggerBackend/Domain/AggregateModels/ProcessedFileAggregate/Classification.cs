namespace Domain.AggregateModels.ProcessedFileAggregate;

public sealed class Classification
{
    private int Id { get; set; }
    public string Name { get; }
    
    public Classification(string name)
    {
        Name = name;
    }

    public override string ToString() => Name;
    public static implicit operator Classification(string value) => new(value);
    
    public override bool Equals(object? obj)
        => obj is Classification acc && acc.Name.Equals(Name);

    public override int GetHashCode() => Name.GetHashCode();
}