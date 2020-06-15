import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import ***REMOVED*** FilterDispatch ***REMOVED*** from '../FilterForm'
import DateFilter from '../FilterClasses/DateFilter'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'

interface IProps ***REMOVED***
  filter: DateFilter
***REMOVED***

const DateFilterInput = (***REMOVED*** filter ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState(filter.from)
  const [toDate, setToDate] = React.useState(filter.to)

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [])
  const toChange = React.useCallback((d: Date) => setToDate(d), [])

  React.useEffect((): void => ***REMOVED***
    const clone = filter.clone()
    clone.from = fromDate
    clone.to = toDate
    dispatch(***REMOVED*** type: 'setFilter', filter: clone ***REMOVED***)
***REMOVED*** [fromDate, toDate, filter, dispatch])

  const name = filter.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor=***REMOVED***`$***REMOVED***name***REMOVED***-From`***REMOVED***>***REMOVED***name***REMOVED***</label>
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
