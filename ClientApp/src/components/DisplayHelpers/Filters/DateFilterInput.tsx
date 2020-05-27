import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'
import ***REMOVED*** FilterDispatch, cloneAndSetValues ***REMOVED*** from './FilterForm'
import ***REMOVED***
  NullableDate,
  dateToString,
  stringToDate
***REMOVED*** from '../../../helpers/dateHelper'

interface IProps ***REMOVED***
  filterField: IFilterField
***REMOVED***

const DateFilterInput = (***REMOVED*** filterField ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[0])
  )
  const [toDate, setToDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[1])
  )

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [])
  const toChange = React.useCallback((d: Date) => setToDate(d), [])

  React.useEffect((): void => ***REMOVED***
    const clone = cloneAndSetValues(filterField, [
      dateToString(fromDate),
      dateToString(toDate)
    ])
    dispatch(***REMOVED*** type: 'setFilter', filterField: clone ***REMOVED***)
***REMOVED*** [fromDate, toDate, filterField])

  const name = filterField.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor=***REMOVED***`$***REMOVED***name***REMOVED***-From`***REMOVED***>***REMOVED***employeeFieldLabels[name]***REMOVED***</label>
      <div className="d-flex w-100">
        <div className="w-50 mr-2">
          <DatePicker
            selected=***REMOVED***fromDate***REMOVED***
            onChange=***REMOVED***fromChange***REMOVED***
            className="form-control form-control-sm"
            placeholderText=***REMOVED***'From'***REMOVED***
          />
        </div>
        <div className="w-50 ml-2">
          <DatePicker
            selected=***REMOVED***toDate***REMOVED***
            onChange=***REMOVED***toChange***REMOVED***
            className="form-control form-control-sm"
            placeholderText=***REMOVED***'To'***REMOVED***
          />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default DateFilterInput
