import React, { useContext } from 'react'
import IconButton from '../../../Interface/Buttons/IconButton'
import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import moment from 'moment'

interface IProps {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetPreviousMonth = ({ submitId, setSubmitId }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousMonth = React.useCallback((): void => {
    const startDate = moment()
      .subtract(1, 'month')
      .date(1)
    const endDate = moment(startDate).add(1, 'month')
    dispatch({
      type: 'setFilter',
      filter: new DateFilter(
        'effectiveDate',
        startDate.toDate(),
        endDate.toDate()
      )
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Active users"
        iconName="check"
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
