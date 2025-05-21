import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED***
  EmployeeStatus,
  EmployeeStatusStateEnum,
***REMOVED*** from '../../../../types/EmployeeStatus'
import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getActiveEmployeesFilter = (): EnumFilter => ***REMOVED***
  const activeStatusKeys = EmployeeStatus.array()
    .filter((status) => status.state === EmployeeStatusStateEnum.Active)
    .map((status) => status.code)
  return new EnumFilter('currentEmployeeStatusCode', activeStatusKeys)
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
      filter: getActiveEmployeesFilter(),
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Exiting employees"
        iconName="user-check"
        colorType="outline-primary"
        marginClasses="me-2"
        iconMarginClasses="me-2"
        buttonClasses="btn-sm"
        onClick=***REMOVED***setActiveEmployees***REMOVED***
      />
    </FilterDispatch.Provider>
  )
***REMOVED***

export default SetActiveEmployees
