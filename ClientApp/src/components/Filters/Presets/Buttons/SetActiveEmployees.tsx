import React, { useContext } from 'react'

import {
  EmployeeStatus,
  EmployeeStatusStateEnum,
} from '../../../../types/EmployeeStatus'
import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getActiveEmployeesFilter = (): EnumFilter => {
  const activeStatusKeys = EmployeeStatus.array()
    .filter((status) => status.state === EmployeeStatusStateEnum.Active)
    .map((status) => status.code)
  return new EnumFilter('currentEmployeeStatusCode', activeStatusKeys)
}

interface Props {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetActiveEmployees = ({ submitId, setSubmitId }: Props): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveEmployees = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: getActiveEmployeesFilter(),
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Exiting employees"
        iconName="user-check"
        colorType="outline-primary"
        marginClasses="me-2"
        iconMarginClasses="me-2"
        buttonClasses="btn-sm"
        onClick={setActiveEmployees}
      />
    </FilterDispatch.Provider>
  )
}

export default SetActiveEmployees
