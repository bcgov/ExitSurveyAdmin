using Newtonsoft.Json;

// Code adapted from https://code-maze.com/paging-aspnet-core-webapi/
public class PageMetadata
{
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int PageSize { get; private set; }
    public int TotalCount { get; private set; }

    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PageMetadata(int count, int pageNumber, int pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (TotalCount + PageSize - 1) / PageSize;
    }

    public string SerializeToJson()
    {
        var metadata = new
        {
            TotalCount,
            PageSize,
            CurrentPage,
            TotalPages,
            HasPrevious,
            HasNext
        };

        return JsonConvert.SerializeObject(metadata);
    }
}
