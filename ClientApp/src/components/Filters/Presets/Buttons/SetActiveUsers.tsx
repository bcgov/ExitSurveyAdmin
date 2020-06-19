import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getActiveUsersFilter = (): EnumFilter => ***REMOVED***
  return new EnumFilter('currentEmployeeStatusCode', ['New', 'SnailMailSent'])
***REMOVED***

interface IProps ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetActiveUsers = (***REMOVED*** submitId, setSubmitId ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveUsers = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getActiveUsersFilter()
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Active users"
        iconName="check"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setActiveUsers***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetActiveUsers
