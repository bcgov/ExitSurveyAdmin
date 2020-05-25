import ***REMOVED*** FilterHandler, IFilterField ***REMOVED*** from './FilterTypes'

const OR_OPERATOR = '|'

export default class EnumFilterHandler extends FilterHandler ***REMOVED***
  static _instance: EnumFilterHandler

  encode(filterField: IFilterField): string ***REMOVED***
    if (!filterField.values || filterField.values.length < 1) ***REMOVED***
      console.warn('EnumFilter: filterField.values is falsy or < 1 length')
      return ''
  ***REMOVED***
    // Joins the items with ORs, e.g. status@=new|email_sent|reminder_1
    return `$***REMOVED***filterField.fieldName***REMOVED***@=$***REMOVED***filterField.values.join(OR_OPERATOR)***REMOVED***`
***REMOVED***

  decode(input: string[]): IFilterField ***REMOVED***
    // This takes multiple values, but will only use the first one.
    const [column, filterValue] = input[0].split('@=')
    if (!column || !filterValue) ***REMOVED***
      throw `TextFilter: Could not parse input '$***REMOVED***input***REMOVED***'`
  ***REMOVED***

    const orValues = filterValue.split(OR_OPERATOR)

    return ***REMOVED***
      fieldName: column,
      type: 'string',
      values: orValues
  ***REMOVED***
***REMOVED***

  static instance(): EnumFilterHandler ***REMOVED***
    if (!this._instance) ***REMOVED***
      this._instance = new EnumFilterHandler()
  ***REMOVED***
    return this._instance
***REMOVED***
***REMOVED***
