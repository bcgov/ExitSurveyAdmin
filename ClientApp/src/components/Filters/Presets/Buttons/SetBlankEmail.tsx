import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'
import CustomFilter from '../../FilterClasses/CustomFilter'

export const getBlankEmailFilter = (): CustomFilter => ***REMOVED***
  return new CustomFilter('blankEmail')
***REMOVED***

interface Props ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetActiveEmployees = (***REMOVED*** submitId, setSubmitId ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveEmployees = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getBlankEmailFilter()
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Blank email"
        iconName="envelope-open"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setActiveEmployees***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetActiveEmployees
