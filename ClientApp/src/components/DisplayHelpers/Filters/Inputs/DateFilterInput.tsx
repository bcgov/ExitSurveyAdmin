import React, { useContext } from 'react'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { FilterDispatch } from '../FilterForm'
import DateFilter from '../FilterClasses/DateFilter'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import { labelFor } from '../../../../helpers/labelHelper'

interface IProps {
  filter: DateFilter
}

const DateFilterInput = ({ filter }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [fromDate, setFromDate] = React.useState(filter.from)
  const [toDate, setToDate] = React.useState(filter.to)

  const fromChange = React.useCallback((d: Date) => setFromDate(d), [])
  const toChange = React.useCallback((d: Date) => setToDate(d), [])

  React.useEffect((): void => {
    const clone = filter.clone()
    clone.from = fromDate
    clone.to = toDate
    dispatch({ type: 'setFilter', filter: clone })
  }, [fromDate, toDate, filter, dispatch])

  const name = filter.fieldName

  return (
    <div className="LabelledItem">
      <label htmlFor={`${name}-From`}>{labelFor(name)}</label>
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
