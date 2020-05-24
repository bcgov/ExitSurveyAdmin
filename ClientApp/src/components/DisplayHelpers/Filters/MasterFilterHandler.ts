import { IFilterField, employeeFilterFields } from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'
import * as qs from 'query-string'

export class MasterFilterHandler {
  static encode(filterField: IFilterField): string {
    switch (filterField.type) {
      case 'string':
      default:
        return TextFilterHandler.instance().encode(
          (filterField as unknown) as IFilterField
        )
    }
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
    let filters = qs.parse(queryString).filters
    if (!filters) {
      return []
    }
    if (!Array.isArray(filters)) {
      filters = [filters]
    }
    return filters.map((s: string) => {
      const [column, filter] = s.split('@=') // Split on the 'contains' operator
      const field = employeeFilterFields.find(eff => eff.fieldName === column)
      if (!field) {
        throw `decodeFromQueryString: could not find ${column} in employeeFilterFields`
      }
      return {
        fieldName: column,
        values: [filter],
        type: field.type
      }
    })
  }

  static extractFromRawQueryString = (queryString: string): string => {
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
  }
}
