import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'
import ***REMOVED*** FilterDispatch, cloneAndSetValues ***REMOVED*** from './FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

interface IProps ***REMOVED***
  filterField: IFilterField
***REMOVED***

const TextFilterInput = (***REMOVED*** filterField ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      const clone = cloneAndSetValues(filterField, [event.target.value])
      dispatch(***REMOVED*** type: 'setFilter', filterField: clone ***REMOVED***)
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
