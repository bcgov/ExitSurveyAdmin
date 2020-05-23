import ***REMOVED*** FilterHandler, IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

export default class TextFilterHandler extends FilterHandler ***REMOVED***
  static _instance: FixTypeLater

  encode(filterField: IFilterField): string ***REMOVED***
    if (!filterField.values || filterField.values.length !== 1) ***REMOVED***
      console.warn('TextFilter: filterField.values is falsy or != 1 length')
      return ''
  ***REMOVED***
    return `$***REMOVED***filterField.fieldName***REMOVED***@=$***REMOVED***filterField.values[0]***REMOVED***`
***REMOVED***

  decode(input: string): IFilterField ***REMOVED***
    const [column, filterValue] = input.split('@=')
    if (!column || !filterValue) ***REMOVED***
      throw `TextFilter: Could not parse input '$***REMOVED***input***REMOVED***'`
  ***REMOVED***
    return ***REMOVED***
      fieldName: column,
      type: 'string',
      values: [filterValue]
  ***REMOVED***
***REMOVED***

  static instance(): TextFilterHandler ***REMOVED***
    if (!this._instance) ***REMOVED***
      this._instance = new TextFilterHandler()
  ***REMOVED***
    return this._instance
***REMOVED***
***REMOVED***
