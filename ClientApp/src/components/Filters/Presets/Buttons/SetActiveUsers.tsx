import React, { useContext } from 'react'

import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import EnumFilter from '../../FilterClasses/EnumFilter'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'

export const getActiveUsersFilter = (): EnumFilter => {
  return new EnumFilter('currentEmployeeStatusCode', ['New', 'SnailMailSent'])
}

interface IProps {
  submitId: number
  setSubmitId: (submitId: number) => void
}

const SetActiveUsers = ({ submitId, setSubmitId }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const setActiveUsers = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: getActiveUsersFilter()
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Active users"
        iconName="check"
        colorType="outline-primary"
        marginClasses="mr-2"
        iconMarginClasses="mr-2"
        buttonClasses="btn-sm"
        onClick={setActiveUsers}
      />
    </FilterDispatch.Provider>
  )
}

export default SetActiveUsers
