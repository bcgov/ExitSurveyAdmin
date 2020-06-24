import * as qs from 'query-string'

import { IFilter } from './FilterClasses/FilterTypes'

export class MasterFilterHandler {
  /** Maps the filters array produced by the react-table to a string that can be
  used by the server API, of the kind &filters=Col1@=someString. The @=
  operator means 'Col1 contains someString'. For a full list of operators see
  the documentation for Sieve: https://github.com/Biarity/Sieve/#operators */
  static encodeAll(filters: IFilter[]): string {
    return filters.length
      ? `&filters=${filters.map(f => f.encode()).join(',')}`
      : ''
  }

  static decodeFromQueryString = (
    filterableFields: IFilter[],
    queryString: string
  ): IFilter[] => {
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) {
      return []
    }
    if (Array.isArray(rawFilters)) {
      throw new Error(
        `MFH.decodeFromQueryString: filters should not be an array`
      )
    }

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filters: IFilter[] = []

    filterableFields.forEach(filter => {
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filter.fieldName)
      )
      // console.log('matchingFilters', matchingFilters)
      if (matchingFilters.length > 0) {
        const clone = filter.clone()
        const decoded = clone.decode(matchingFilters)
        filters.push(decoded as IFilter)
      }
    })

    return filters
  }

  static extractFromRawQueryString = (
    filterableFields: IFilter[],
    queryString: string
  ): string => {
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(filterableFields, queryString)
    )
  }
}
