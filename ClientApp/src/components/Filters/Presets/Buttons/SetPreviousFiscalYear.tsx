import React, ***REMOVED*** useContext ***REMOVED*** from 'react'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'
import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import DateFilter from '../../FilterClasses/DateFilter'
import moment from 'moment'

interface IProps ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetPreviousFiscalYear = (***REMOVED***
  submitId,
  setSubmitId
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setPreviousFiscalYear = React.useCallback((): void => ***REMOVED***
    let startDate = moment()
    const currentYearApril = moment()
      .month('April')
      .date(1)

    if (startDate.isBefore(currentYearApril)) ***REMOVED***
      startDate = startDate.subtract(1, 'year')
  ***REMOVED***
    startDate = startDate
      .subtract(1, 'year')
      .month('April')
      .date(1)
    const endDate = moment(startDate).add(1, 'year')

    dispatch(***REMOVED***
      type: 'setFilter',
      filter: new DateFilter(
        'effectiveDate',
        startDate.toDate(),
        endDate.toDate()
      )
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Previous fiscal year"
        iconName="check"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setPreviousFiscalYear***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetPreviousFiscalYear
