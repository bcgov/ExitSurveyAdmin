import React, ***REMOVED*** useContext, type JSX ***REMOVED*** from 'react'
import DatePicker from 'react-datepicker'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'
import ***REMOVED*** labelFor ***REMOVED*** from '../../../helpers/labelHelper'
import DateFilter from '../FilterClasses/DateFilter'

import 'react-datepicker/dist/react-datepicker.css'

interface Props ***REMOVED***
  filter: DateFilter
  resetTimestamp: number
***REMOVED***

const DateFilterInput = (***REMOVED*** filter, resetTimestamp ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState(filter.from)
  const [toDate, setToDate] = React.useState(filter.to)

  React.useEffect((): void => ***REMOVED***
    setFromDate(undefined)
    setToDate(undefined)
***REMOVED*** [resetTimestamp])

  React.useEffect((): void => ***REMOVED***
    const clone = filter.clone()
    clone.from = fromDate
    clone.to = toDate
    if (fromDate || toDate) ***REMOVED***
      dispatch(***REMOVED*** type: 'setFilter', filter: clone ***REMOVED***)
  ***REMOVED***
***REMOVED*** [fromDate, toDate, filter, dispatch])

  const fromChange = React.useCallback((d: Date | null) => setFromDate(d ?? undefined), [])
  const toChange = React.useCallback((d: Date | null) => setToDate(d ?? undefined), [])

  const name = filter.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor=***REMOVED***`$***REMOVED***name***REMOVED***-From`***REMOVED***>***REMOVED***labelFor(name)***REMOVED***</label>
      <div key=***REMOVED***`$***REMOVED***resetTimestamp***REMOVED***`***REMOVED*** className="d-flex">
        <div className="w-50 me-1">
          <DatePicker
            selected=***REMOVED***fromDate***REMOVED***
            onChange=***REMOVED***fromChange***REMOVED***
            className="form-control form-control-sm"
            placeholderText=***REMOVED***'From'***REMOVED***
            popperPlacement='bottom-start'
            popperModifiers=***REMOVED***[
              ***REMOVED***
                name: 'preventOverflow',
                options: ***REMOVED*** boundary: 'viewport' ***REMOVED***,
                fn: (data) => ***REMOVED*** return data; ***REMOVED***,
            ***REMOVED***
            ]***REMOVED***
          />
        </div>
        <div className="w-50 ms-1">
          <DatePicker
            selected=***REMOVED***toDate***REMOVED***
            onChange=***REMOVED***toChange***REMOVED***
            className="form-control form-control-sm"
            placeholderText=***REMOVED***'To'***REMOVED***
            popperPlacement='bottom-start'
            popperModifiers=***REMOVED***[
              ***REMOVED***
                name: 'preventOverflow',
                options: ***REMOVED*** boundary: 'viewport' ***REMOVED***,
                fn: (data) => ***REMOVED*** return data; ***REMOVED***,
            ***REMOVED***
            ]***REMOVED***
          />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default DateFilterInput
