import React, { useContext } from 'react'
import { IFilterField } from './FilterTypes'
import { employeeFieldLabels } from '../../../types/Employee'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { FixTypeLater } from '../../../types/FixTypeLater'
import { FilterDispatch, cloneAndSetValues } from './FilterForm'
import {
  NullableDate,
  dateToString,
  stringToDate
} from '../../../helpers/dateHelper'

interface IProps {
  filterField: IFilterField
}

const DateFilterInput = ({ filterField }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[0])
  )
  const [toDate, setToDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[1])
  )

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [])
  const toChange = React.useCallback((d: Date) => setToDate(d), [])

  React.useEffect((): void => {
    const clone = cloneAndSetValues(filterField, [
      dateToString(fromDate),
      dateToString(toDate)
    ])
    dispatch({ type: 'setFilter', filterField: clone })
  }, [fromDate, toDate, filterField, dispatch])

  const name = filterField.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor={`${name}-From`}>{employeeFieldLabels[name]}</label>
      <div className="d-flex w-100">
        <div className="w-50 mr-2">
          <DatePicker
            selected={fromDate}
            onChange={fromChange}
            className="form-control form-control-sm"
            placeholderText={'From'}
          />
        </div>
        <div className="w-50 ml-2">
          <DatePicker
            selected={toDate}
            onChange={toChange}
            className="form-control form-control-sm"
            placeholderText={'To'}
          />
        </div>
      </div>
    </div>
  )
}

export default DateFilterInput
