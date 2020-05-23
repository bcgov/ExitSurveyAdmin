import React from 'react'
import ***REMOVED*** FilterHandler, IFilterField ***REMOVED*** from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

export class TextFilterHandler extends FilterHandler ***REMOVED***
  static _instance: TextFilterHandler = new TextFilterHandler()

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
    return this._instance
***REMOVED***
***REMOVED***

interface IProps ***REMOVED***
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
***REMOVED***

const TextFilterInput = (***REMOVED*** filterField, setFilter ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      const filterFieldClone = Object.assign(***REMOVED******REMOVED***, filterField)
      filterFieldClone.values = [event.target.value]
      setFilter(filterFieldClone)
  ***REMOVED***
    [filterField]
  )

  return (
    <LabelledInput
      title=***REMOVED***employeeFieldLabels[filterField.fieldName]***REMOVED***
      name=***REMOVED***filterField.fieldName***REMOVED***
      onChange=***REMOVED***handleChange***REMOVED***
    />
  )
***REMOVED***

export default TextFilterInput
