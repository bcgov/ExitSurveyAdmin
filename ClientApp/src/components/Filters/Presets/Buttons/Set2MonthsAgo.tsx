import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import moment from 'moment-timezone'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const get2MonthsAgoFilter = (): DateFilter => ***REMOVED***
  const startDate = moment().subtract(2, 'month').startOf('month')
  const endDate = moment(startDate).endOf('month')
  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
***REMOVED***

interface Props ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const Set2MonthsAgo = (***REMOVED*** submitId, setSubmitId ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousMonth = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: get2MonthsAgoFilter(),
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="2 months ago"
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

export default Set2MonthsAgo
