using System.Linq;
using System;
using System.Collections.Generic;

// Code adapted from https://code-maze.com/paging-aspnet-core-webapi/
public class PagedList<T> : List<T>
***REMOVED***
    public int CurrentPage ***REMOVED*** get; private set; ***REMOVED***
    public int TotalPages ***REMOVED*** get; private set; ***REMOVED***
    public int PageSize ***REMOVED*** get; private set; ***REMOVED***
    public int TotalCount ***REMOVED*** get; private set; ***REMOVED***

    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    ***REMOVED***
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);

        AddRange(items);
  ***REMOVED***

    public static PagedList<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
    ***REMOVED***
        var count = source.Count();
        var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        return new PagedList<T>(items, count, pageNumber, pageSize);
  ***REMOVED***
***REMOVED***
