import ***REMOVED*** IFilterField, employeeFilterFields ***REMOVED*** from './FilterTypes'
import TextFilterHandler from './TextFilterHandler'
import * as qs from 'query-string'
import DateFilterHandler from './DateFilterHandler'

export class MasterFilterHandler ***REMOVED***
  static encode(filterField: IFilterField): string ***REMOVED***
    let instance
    switch (filterField.type) ***REMOVED***
      case 'date':
        instance = DateFilterHandler.instance()
        break
      case 'string':
      default:
        instance = TextFilterHandler.instance()
  ***REMOVED***
    return instance.encode((filterField as unknown) as IFilterField)
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
      throw `decodeFromQueryString: filters should not be an array`
  ***REMOVED***

    const filterStrings = rawFilters.split(',')

    // Set up an array to hold the filters
    const filterFields: IFilterField[] = []

    employeeFilterFields.forEach(filterField => ***REMOVED***
      const matchingFilters = filterStrings.filter(filterString =>
        filterString.startsWith(filterField.fieldName)
      )
      if (matchingFilters.length > 0) ***REMOVED***
        const handlerInstance =
          filterField.type === 'date'
            ? DateFilterHandler.instance()
            : TextFilterHandler.instance()

        filterFields.push(handlerInstance.decode(matchingFilters))
    ***REMOVED***
  ***REMOVED***)

    //   // Find the operator (note -1 because we're searching for the =, and the =
    //   // is always prefixed by either an @, >, or <).
    //   const operatorIndex = s.indexOf('=') - 1
    //   const operator = s.substr(operatorIndex, 2) // Get the whole operator

    //   const [key, value] = s.split(operator)

    //   // See if the field is one of the defined employeeFilterFields
    //   const field = employeeFilterFields.find(eff => eff.fieldName === key)
    //   if (!field) ***REMOVED***
    //     throw `decodeFromQueryString: could not find $***REMOVED***key***REMOVED*** in employeeFilterFields`
    // ***REMOVED***

    //   if (field.type === 'date') ***REMOVED***
    //     // Now, if the field is a date, we need to set either index 0 or index 1
    //     // of the values array: 0 if the operator is GTE, 1 if LTE
    //     const indexToSet = operator === gteOperator ? 0 : 1

    //     // See if the filterMap already has an entry
    //     if (filterMap[key]) ***REMOVED***
    //       filterMap[key].values[indexToSet] = value
    //   ***REMOVED*** else ***REMOVED***
    //       const values = ['', '']
    //       values[indexToSet] = value
    //       filterMap[key] = ***REMOVED*** fieldName: key, values, type: field.type ***REMOVED***
    //   ***REMOVED***
    // ***REMOVED*** else ***REMOVED***
    //     // Otherwise, just overwrite the value in the map
    //     filterMap[key] = ***REMOVED*** fieldName: key, values: [value], type: field.type ***REMOVED***
    // ***REMOVED***
    // ***REMOVED***)

    return filterFields
***REMOVED***

  static extractFromRawQueryString = (queryString: string): string => ***REMOVED***
    return MasterFilterHandler.encodeAll(
      MasterFilterHandler.decodeFromQueryString(queryString)
    )
***REMOVED***
***REMOVED***
