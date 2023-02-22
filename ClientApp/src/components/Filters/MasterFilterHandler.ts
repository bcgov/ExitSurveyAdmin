import * as qs from 'query-string'

import ***REMOVED*** IFilter ***REMOVED*** from './FilterClasses/FilterTypes'

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

  static decodeFromQueryString = (
    filterableFields: IFilter[],
    queryString: string
  ): IFilter[] => ***REMOVED***
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) ***REMOVED***
      return []
  ***REMOVED***
    if (Array.isArray(rawFilters)) ***REMOVED***
      throw new Error(
        `MFH.decodeFromQueryString: filters should not be an array`
      )
  ***REMOVED***

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filters: IFilter[] = []

    filterableFields.forEach(filter => ***REMOVED***
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filter.fieldName)
      )
      // console.log('matchingFilters', matchingFilters)
      if (matchingFilters.length > 0) ***REMOVED***
        const clone = filter.clone()
        const decoded = clone.decode(matchingFilters)
        filters.push(decoded as IFilter)
    ***REMOVED***
  ***REMOVED***)

    return filters
***REMOVED***

  static extractFromRawQueryString = (
    filterableFields: IFilter[],
    queryString: string
  ): string => ***REMOVED***
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(filterableFields, queryString)
    )
***REMOVED***
***REMOVED***
