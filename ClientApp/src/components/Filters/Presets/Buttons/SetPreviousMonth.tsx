import React, { useContext } from 'react'
import moment from 'moment'

import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getPreviousMonthFilter = (): DateFilter => {
  const startDate = moment()
    .subtract(1, 'month')
    .startOf('month')
  const endDate = moment(startDate).endOf('month')
  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
}

interface IProps {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetPreviousMonth = ({ submitId, setSubmitId }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousMonth = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: getPreviousMonthFilter()
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Previous month"
        iconName="calendar-minus"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick={setPreviousMonth}
      />
    </FilterDispatch.Provider>
  )
}

export default SetPreviousMonth
