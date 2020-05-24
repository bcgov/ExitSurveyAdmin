import React from 'react'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

interface IProps ***REMOVED***
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
***REMOVED***

type NullableDate = Date | null

const defaultFormat = 'YYYY-MM-DD'

const dateToString = (date: NullableDate): string => ***REMOVED***
  return date ? moment(date).format(defaultFormat) : ''
***REMOVED***
const stringToDate = (str: string): NullableDate => ***REMOVED***
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : null
***REMOVED***

const DateFilterInput = (***REMOVED*** filterField, setFilter ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const [fromDate, setFromDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[0])
  )
  const [toDate, setToDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[1])
  )

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [fromDate])
  const toChange = React.useCallback((d: Date) => setToDate(d), [toDate])

  React.useEffect((): void => ***REMOVED***
    const filterFieldClone = Object.assign(***REMOVED******REMOVED***, filterField)
    filterFieldClone.values = [dateToString(fromDate), dateToString(toDate)]
    // filterFieldClone.values[index] = dateToString(date)
    setFilter(filterFieldClone)
***REMOVED*** [fromDate, toDate])

  console.log('filterField', filterField)

  const fieldName = filterField.fieldName

  const label = employeeFieldLabels[filterField.fieldName]

  const fromId = `$***REMOVED***fieldName***REMOVED***-From`
  const toId = `$***REMOVED***fieldName***REMOVED***-To`
  const fromName = `$***REMOVED***fieldName***REMOVED***-FromName`
  const toName = `$***REMOVED***fieldName***REMOVED***-ToName`

  console.log(
    stringToDate(filterField.values[0]),
    stringToDate(filterField.values[1])
  )

  return (
    <div className="LabelledItem">
      <label htmlFor=***REMOVED***fromId***REMOVED***>***REMOVED***label***REMOVED***</label>
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
