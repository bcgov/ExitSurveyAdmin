import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

dayjs.extend(timezone)

export const getPreviousMonthFilter = (): DateFilter => ***REMOVED***
  const startDate = dayjs().subtract(1, 'month').startOf('month')
  const endDate = startDate.endOf('month')
  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
***REMOVED***

interface Props ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetPreviousMonth = (***REMOVED*** submitId, setSubmitId ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousMonth = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getPreviousMonthFilter(),
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Previous month"
        iconName="calendar-minus"
        colorType="outline-primary"
        marginClasses="me-2"
        iconMarginClasses="me-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setPreviousMonth***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetPreviousMonth
