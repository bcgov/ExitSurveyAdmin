import React, { useContext } from 'react'
import moment from 'moment'

import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getPreviousFiscalYearFilter = (): DateFilter => {
  let startDate = moment()
  const currentYearApril = moment()
    .month('April')
    .date(1)

  if (startDate.isBefore(currentYearApril)) {
    startDate = startDate.subtract(1, 'year')
  }
  startDate = startDate
    .subtract(1, 'year')
    .month('April')
    .date(1)
  const endDate = moment(startDate).add(1, 'year')

  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
}

interface IProps {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetPreviousFiscalYear = ({
  submitId,
  setSubmitId
}: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousFiscalYear = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: getPreviousFiscalYearFilter()
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Previous fiscal year"
        iconName="calendar-alt"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick={setPreviousFiscalYear}
      />
    </FilterDispatch.Provider>
  )
}

export default SetPreviousFiscalYear
