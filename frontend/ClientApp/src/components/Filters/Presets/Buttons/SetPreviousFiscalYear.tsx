import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

dayjs.extend(timezone)

// NOTE: dayjs months are 0-indexed (April = 3, March = 2)
export const getPreviousFiscalYearFilter = (): DateFilter => ***REMOVED***
  let startDate = dayjs()
  const currentYearApril = dayjs().month(3).startOf('month')

  if (startDate.isBefore(currentYearApril)) ***REMOVED***
    startDate = startDate.subtract(1, 'year')
***REMOVED***
  startDate = startDate.subtract(1, 'year').month(3).startOf('month')
  const endDate = startDate.add(1, 'year').month(2).endOf('month')

  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
***REMOVED***

interface Props ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetPreviousFiscalYear = (***REMOVED***
  submitId,
  setSubmitId,
***REMOVED***: Props): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousFiscalYear = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getPreviousFiscalYearFilter(),
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Previous fiscal year"
        iconName="calendar-alt"
        colorType="outline-primary"
        marginClasses="me-2"
        iconMarginClasses="me-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setPreviousFiscalYear***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetPreviousFiscalYear
