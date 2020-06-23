import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED*** FilterDispatch ***REMOVED*** from '../../FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'
import ***REMOVED***
  EmployeeStatus,
  EmployeeStatusStateEnum
***REMOVED*** from '../../../../types/EmployeeStatus'

export const getActiveEmployeesFilter = (): EnumFilter => ***REMOVED***
  const activeStatusKeys = EmployeeStatus.array()
    .filter(status => status.state === EmployeeStatusStateEnum.Active)
    .map(status => status.code)
  return new EnumFilter('currentEmployeeStatusCode', activeStatusKeys)
***REMOVED***

interface IProps ***REMOVED***
  submitId: number
  setSubmitId: (submitId: number) => void
***REMOVED***

const SetActiveEmployees = (***REMOVED*** submitId, setSubmitId ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveEmployees = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: getActiveEmployeesFilter()
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <IconButton
        label="Active employees"
        iconName="user-check"
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
