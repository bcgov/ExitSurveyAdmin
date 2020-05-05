using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitSurveyAdmin.Models;
using ExitSurveyAdmin.Services;
using Newtonsoft.Json;
using Sieve.Services;
using Sieve.Models;
using Newtonsoft.Json;

// Extension code for Sieve from https://github.com/Biarity/Sieve/issues/53.
public static class ISieveProcessorExtensions
***REMOVED***
    public static async Task<PagedResult<T>> GetPagedAsync<T>(this ISieveProcessor sieveProcessor, IQueryable<T> query, SieveModel sieveModel = null) where T : class
    ***REMOVED***
        var result = new PagedResult<T>();

        var (pagedQuery, page, pageSize, recordCount, pageCount) = await GetPagedResultAsync(sieveProcessor, query, sieveModel);

        result.CurrentPage = page;
        result.PageSize = pageSize;
        result.RecordCount = recordCount;
        result.PageCount = pageCount;

        result.Results = await pagedQuery.ToListAsync();

        return result;
  ***REMOVED***

    private static async Task<(IQueryable<T> pagedQuery, int page, int pageSize, int recordCount, int pageCount)> GetPagedResultAsync<T>(ISieveProcessor sieveProcessor, IQueryable<T> query, SieveModel sieveModel = null) where T : class
    ***REMOVED***
        var page = sieveModel?.Page ?? 1;
        var pageSize = sieveModel?.PageSize ?? 20;

        if (sieveModel != null)
        ***REMOVED***
            // apply pagination in a later step
            query = sieveProcessor.Apply(sieveModel, query, applyPagination: false);
      ***REMOVED***

        var recordCount = await query.CountAsync();

        var pageCount = (recordCount + pageSize - 1) / pageSize;

        var skip = (page - 1) * pageSize;
        var pagedQuery = query.Skip(skip).Take(pageSize);

        return (pagedQuery, page, pageSize, recordCount, pageCount);
  ***REMOVED***
***REMOVED***

public class PagedResult<T> where T : class
***REMOVED***
    public IList<T> Results ***REMOVED*** get; set; ***REMOVED***
    public int CurrentPage ***REMOVED*** get; set; ***REMOVED***
    public int PageCount ***REMOVED*** get; set; ***REMOVED***
    public int PageSize ***REMOVED*** get; set; ***REMOVED***
    public long RecordCount ***REMOVED*** get; set; ***REMOVED***
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < RecordCount;

    public PagedResult()
    ***REMOVED***
        Results = new List<T>();
  ***REMOVED***

    public string SerializeMetadataToJson()
    ***REMOVED***
        var metadata = new
        ***REMOVED***
            RecordCount,
            PageSize,
            CurrentPage,
            PageCount,
            HasPrevious,
            HasNext
      ***REMOVED***;

        return JsonConvert.SerializeObject(metadata);
  ***REMOVED***
***REMOVED***