import React, { useContext } from 'react'

import { FilterDispatch } from '../../FilterForm'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import IconButton from '../../../DisplayHelpers/Interface/Buttons/IconButton'
import CustomFilter from '../../FilterClasses/CustomFilter'

export const getBlankEmailFilter = (): CustomFilter => {
  return new CustomFilter('blankEmail')
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
      filter: getBlankEmailFilter(),
    })
    setSubmitId(submitId + 1)
  }, [dispatch, submitId, setSubmitId])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <IconButton
        label="Blank email"
        iconName="envelope-open"
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
