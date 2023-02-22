using Newtonsoft.Json;

// Code adapted from https://code-maze.com/paging-aspnet-core-webapi/
public class PageMetadata
***REMOVED***
    public int CurrentPage ***REMOVED*** get; private set; ***REMOVED***
    public int TotalPages ***REMOVED*** get; private set; ***REMOVED***
    public int PageSize ***REMOVED*** get; private set; ***REMOVED***
    public int TotalCount ***REMOVED*** get; private set; ***REMOVED***

    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PageMetadata(int count, int pageNumber, int pageSize)
    ***REMOVED***
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (TotalCount + PageSize - 1) / PageSize;
  ***REMOVED***

    public string SerializeToJson()
    ***REMOVED***
        var metadata = new
        ***REMOVED***
            TotalCount,
            PageSize,
            CurrentPage,
            TotalPages,
            HasPrevious,
            HasNext
      ***REMOVED***;

        return JsonConvert.SerializeObject(metadata);
  ***REMOVED***
***REMOVED***
