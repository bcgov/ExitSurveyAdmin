import { IFilter, filterableFields } from './FilterClasses/FilterTypes'
import * as qs from 'query-string'

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

  static decodeFromQueryString = (queryString: string): IFilter[] => {
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) {
      return []
    }
    if (Array.isArray(rawFilters)) {
      throw new Error(`decodeFromQueryString: filters should not be an array`)
    }

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filters: IFilter[] = []

    filterableFields.forEach(filter => {
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filter.fieldName)
      )
      if (matchingFilters.length > 0) {
        filters.push(filter.decode(matchingFilters) as IFilter)
      }
    })

    return filters
  }

  static extractFromRawQueryString = (queryString: string): string => {
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
  }
}
