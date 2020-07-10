using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Sieve.Models;
using Sieve.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Extension code for Sieve from https://github.com/Biarity/Sieve/issues/53.
public static class ISieveProcessorExtensions
{
    public static async Task<PagedResult<T>> GetPagedAsync<T>(this ISieveProcessor sieveProcessor, IQueryable<T> query, SieveModel sieveModel = null) where T : class
    {
        var result = new PagedResult<T>();

        var (pagedQuery, page, pageSize, recordCount, pageCount) = await GetPagedResultAsync(sieveProcessor, query, sieveModel);

        result.CurrentPage = page;
        result.PageSize = pageSize;
        result.RecordCount = recordCount;
        result.PageCount = pageCount;

        result.Results = await pagedQuery.ToListAsync();

        return result;
    }

    private static async Task<(IQueryable<T> pagedQuery, int page, int pageSize, int recordCount, int pageCount)> GetPagedResultAsync<T>(ISieveProcessor sieveProcessor, IQueryable<T> query, SieveModel sieveModel = null) where T : class
    {
        var page = sieveModel?.Page ?? 1;
        var pageSize = sieveModel?.PageSize ?? 20;

        if (sieveModel != null)
        {
            // apply pagination in a later step
            query = sieveProcessor.Apply(sieveModel, query, applyPagination: false);
        }

        var recordCount = await query.CountAsync();

        var pageCount = (recordCount + pageSize - 1) / pageSize;

        var skip = (page - 1) * pageSize;
        var pagedQuery = query.Skip(skip).Take(pageSize);

        return (pagedQuery, page, pageSize, recordCount, pageCount);
    }
}

public class PagedResult<T> where T : class
{
    public IList<T> Results { get; set; }
    public int CurrentPage { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
    public long RecordCount { get; set; }
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < RecordCount;

    public PagedResult()
    {
        Results = new List<T>();
    }

    public string SerializeMetadataToJson()
    {
        var metadata = new
        {
            RecordCount,
            PageSize,
            CurrentPage,
            PageCount,
            HasPrevious,
            HasNext
        };

        return JsonConvert.SerializeObject(metadata);
    }
}