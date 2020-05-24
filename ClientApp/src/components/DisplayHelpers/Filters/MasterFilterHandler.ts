import { IFilterField, employeeFilterFields } from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'
import * as qs from 'query-string'
import DateFilterHandler from './DateFilterHandler'

export class MasterFilterHandler {
  static instanceFor(field: IFilterField): TextFilterHandler {
    switch (field.type) {
      case 'date':
        return DateFilterHandler.instance()
      case 'string':
      default:
        return TextFilterHandler.instance()
    }
  }

  static encode(filterField: IFilterField): string {
    return MasterFilterHandler.instanceFor(filterField).encode(filterField)
  }

  /** Maps the filters array produced by the react-table to a string that can be
  used by the server API, of the kind &filters=Col1@=someString. The @=
  operator means 'Col1 contains someString'. For a full list of operators see
  the documentation for Sieve: https://github.com/Biarity/Sieve/#operators */
  static encodeAll(filters: IFilterField[]): string {
    return filters.length
      ? `&filters=${filters.map(f => MasterFilterHandler.encode(f)).join(',')}`
      : ''
  }

  static decodeFromQueryString = (queryString: string): IFilterField[] => {
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) {
      return []
    }
    if (Array.isArray(rawFilters)) {
      throw `decodeFromQueryString: filters should not be an array`
    }

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filterFields: IFilterField[] = []

    employeeFilterFields.forEach(filterField => {
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filterField.fieldName)
      )
      if (matchingFilters.length > 0) {
        filterFields.push(
          MasterFilterHandler.instanceFor(filterField).decode(matchingFilters)
        )
      }
    })

    return filterFields
  }

  static extractFromRawQueryString = (queryString: string): string => {
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
  }
}
