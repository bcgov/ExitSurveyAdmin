import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import moment from 'moment'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getPreviousMonthFilter = (): DateFilter => ***REMOVED***
  const startDate = moment()
    .subtract(1, 'month')
    .date(1)
  const endDate = moment(startDate).add(1, 'month')
  return new DateFilter('effectiveDate', startDate.toDate(), endDate.toDate())
***REMOVED***

interface IProps ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetPreviousMonth = (***REMOVED*** submitId, setSubmitId ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousMonth = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getPreviousMonthFilter()
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Previous month"
        iconName="check"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setPreviousMonth***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetPreviousMonth
