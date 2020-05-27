import ***REMOVED*** IFilterField, employeeFilterFields ***REMOVED*** from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'
import * as qs from 'query-string'
import DateFilterHandler from './DateFilterHandler'
import EnumFilterHandler from './EnumFilterHandler'

export class MasterFilterHandler ***REMOVED***
  static instanceFor(field: IFilterField): TextFilterHandler ***REMOVED***
    switch (field.type) ***REMOVED***
      case 'date':
        return DateFilterHandler.instance()
      case 'enum':
        return EnumFilterHandler.instance()
      case 'string':
      default:
        return TextFilterHandler.instance()
  ***REMOVED***
***REMOVED***

  static encode(filterField: IFilterField): string ***REMOVED***
    return MasterFilterHandler.instanceFor(filterField).encode(filterField)
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
    const rawFilters = qs.parse(queryString).filters
    if (!rawFilters) ***REMOVED***
      return []
  ***REMOVED***
    if (Array.isArray(rawFilters)) ***REMOVED***
      throw new Error(`decodeFromQueryString: filters should not be an array`)
  ***REMOVED***

    const filterStrings = rawFilters.split(',')
    console.log('filterStrings', filterStrings)

    // Set up an array to hold the filters
    const filterFields: IFilterField[] = []

    employeeFilterFields.forEach(filterField => ***REMOVED***
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filterField.fieldName)
      )
      if (matchingFilters.length > 0) ***REMOVED***
        filterFields.push(
          MasterFilterHandler.instanceFor(filterField).decode(matchingFilters)
        )
    ***REMOVED***
  ***REMOVED***)

    return filterFields
***REMOVED***

  static extractFromRawQueryString = (queryString: string): string => ***REMOVED***
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
***REMOVED***
***REMOVED***
