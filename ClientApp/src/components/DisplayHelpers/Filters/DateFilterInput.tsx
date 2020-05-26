import React from 'react'
import { IFilterField } from './FilterTypes'
import { employeeFieldLabels } from '../../../types/Employee'

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

interface IProps {
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
}

type NullableDate = Date | null

const defaultFormat = 'YYYY-MM-DD'

const dateToString = (date: NullableDate): string => {
  return date ? moment(date).format(defaultFormat) : ''
}
const stringToDate = (str: string): NullableDate => {
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : null
}

const DateFilterInput = ({ filterField, setFilter }: IProps): JSX.Element => {
  const [fromDate, setFromDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[0])
  )
  const [toDate, setToDate] = React.useState<NullableDate>(
    stringToDate(filterField.values[1])
  )

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [fromDate])
  const toChange = React.useCallback((d: Date) => setToDate(d), [toDate])

  React.useEffect((): void => {
    const filterFieldClone = Object.assign({}, filterField)
    filterFieldClone.values = [dateToString(fromDate), dateToString(toDate)]
    // filterFieldClone.values[index] = dateToString(date)
    setFilter(filterFieldClone)
  }, [fromDate, toDate])

  const fieldName = filterField.fieldName

  const label = employeeFieldLabels[filterField.fieldName]

  const fromId = `${fieldName}-From`

  return (
    <div className="LabelledItem">
      <label htmlFor={fromId}>{label}</label>
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
