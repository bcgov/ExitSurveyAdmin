import ***REMOVED*** IFilterField, employeeFilterFields ***REMOVED*** from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'
import * as qs from 'query-string'

export class MasterFilterHandler ***REMOVED***
  static encode(filterField: IFilterField): string ***REMOVED***
    switch (filterField.type) ***REMOVED***
      case 'string':
      default:
        return TextFilterHandler.instance().encode(
          (filterField as unknown) as IFilterField
        )
  ***REMOVED***
***REMOVED***

  /** Maps the filters array produced by the react-table to a string that can be
  used by the server API, of the kind &filters=Col1@=someString. The @=
  operator means 'Col1 contains someString'. For a full list of operators see
  the documentation for Sieve: https://github.com/Biarity/Sieve/#operators */
  static encodeAll(filters: IFilterField[]): string ***REMOVED***
    return filters.length
      ? `&filters=$***REMOVED***filters.map(f => MasterFilterHandler.encode(f)).join(',')***REMOVED***`
      : ''
***REMOVED***

  static decodeFromQueryString = (queryString: string): IFilterField[] => ***REMOVED***
    let filters = qs.parse(queryString).filters
    if (!filters) ***REMOVED***
      return []
  ***REMOVED***
    if (!Array.isArray(filters)) ***REMOVED***
      filters = [filters]
  ***REMOVED***
    return filters.map((s: string) => ***REMOVED***
      const [column, filter] = s.split('@=') // Split on the 'contains' operator
      const field = employeeFilterFields.find(eff => eff.fieldName === column)
      if (!field) ***REMOVED***
        throw `decodeFromQueryString: could not find $***REMOVED***column***REMOVED*** in employeeFilterFields`
    ***REMOVED***
      return ***REMOVED***
        fieldName: column,
        values: [filter],
        type: field.type
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

  static extractFromRawQueryString = (queryString: string): string => ***REMOVED***
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
***REMOVED***
***REMOVED***
