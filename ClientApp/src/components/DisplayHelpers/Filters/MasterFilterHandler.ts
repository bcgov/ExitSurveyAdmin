import ***REMOVED*** IFilter, filterableFields ***REMOVED*** from './FilterClasses/FilterTypes'
import * as qs from 'query-string'

export class MasterFilterHandler ***REMOVED***
  /** Maps the filters array produced by the react-table to a string that can be
  used by the server API, of the kind &filters=Col1@=someString. The @=
  operator means 'Col1 contains someString'. For a full list of operators see
  the documentation for Sieve: https://github.com/Biarity/Sieve/#operators */
  static encodeAll(filters: IFilter[]): string ***REMOVED***
    return filters.length
      ? `&filters=$***REMOVED***filters.map(f => f.encode()).join(',')***REMOVED***`
      : ''
***REMOVED***

  static decodeFromQueryString = (queryString: string): IFilter[] => ***REMOVED***
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) ***REMOVED***
      return []
  ***REMOVED***
    if (Array.isArray(rawFilters)) ***REMOVED***
      throw new Error(`decodeFromQueryString: filters should not be an array`)
  ***REMOVED***

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filters: IFilter[] = []

    filterableFields.forEach(filter => ***REMOVED***
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filter.fieldName)
      )
      if (matchingFilters.length > 0) ***REMOVED***
        filters.push(filter.decode(matchingFilters) as IFilter)
    ***REMOVED***
  ***REMOVED***)

    return filters
***REMOVED***

  static extractFromRawQueryString = (queryString: string): string => ***REMOVED***
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
***REMOVED***
***REMOVED***
