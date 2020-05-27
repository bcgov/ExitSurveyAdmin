import React, { useContext } from 'react'
import { IFilterField } from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import { employeeFieldLabels } from '../../../types/Employee'
import { FilterDispatch, cloneAndSetValues } from './FilterForm'
import { FixTypeLater } from '../../../types/FixTypeLater'

interface IProps {
  filterField: IFilterField
}

const TextFilterInput = ({ filterField }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const clone = cloneAndSetValues(filterField, [event.target.value])
      dispatch({ type: 'setFilter', filterField: clone })
    },
    [filterField]
  )

  return (
    <LabelledInput
      title={employeeFieldLabels[filterField.fieldName]}
      name={filterField.fieldName}
      onChange={handleChange}
    />
  )
}

export default TextFilterInput
