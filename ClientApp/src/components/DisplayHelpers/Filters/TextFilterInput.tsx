import React from 'react'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

interface IProps ***REMOVED***
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
***REMOVED***

const TextFilterInput = (***REMOVED*** filterField, setFilter ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      console.log('--> filterField', filterField)
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
