import React, { useContext } from 'react'

import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'
import { EmployeeStatusEnum } from '../../../../types/EmployeeStatus'

export const getActiveEmployeesFilter = (): EnumFilter => {
  return new EnumFilter('currentEmployeeStatusCode', [
    EmployeeStatusEnum.Exiting,
    EmployeeStatusEnum.SnailMailSent
  ])
}

interface IProps {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetActiveEmployees = ({ submitId, setSubmitId }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveEmployees = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: getActiveEmployeesFilter()
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Active employees"
        iconName="user-check"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick={setActiveEmployees}
      />
    </FilterDispatch.Provider>
  )
}

export default SetActiveEmployees
