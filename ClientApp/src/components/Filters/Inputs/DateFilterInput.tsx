import React, { useContext } from 'react'
import DatePicker from 'react-datepicker'

import { FilterDispatch } from '../FilterForm'
import { FixTypeLater } from '../../../types/FixTypeLater'
import { labelFor } from '../../../helpers/labelHelper'
import DateFilter from '../FilterClasses/DateFilter'

import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  filter: DateFilter
  resetTimestamp: number
}

const DateFilterInput = ({ filter, resetTimestamp }: Props): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState(filter.from)
  const [toDate, setToDate] = React.useState(filter.to)

  React.useEffect((): void => {
    setFromDate(undefined)
    setToDate(undefined)
  }, [resetTimestamp])

  React.useEffect((): void => {
    const clone = filter.clone()
    clone.from = fromDate
    clone.to = toDate
    if (fromDate || toDate) {
      dispatch({ type: 'setFilter', filter: clone })
    }
  }, [fromDate, toDate, filter, dispatch])

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [])
  const toChange = React.useCallback((d: Date) => setToDate(d), [])

  const name = filter.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor={`${name}-From`}>{labelFor(name)}</label>
      <div key={`${resetTimestamp}`} className="d-flex">
        <div className="w-50 mr-1">
          <DatePicker
            selected={fromDate}
            onChange={fromChange}
            className="form-control form-control-sm"
            placeholderText={'From'}
          />
        </div>
        <div className="w-50 ml-1">
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
