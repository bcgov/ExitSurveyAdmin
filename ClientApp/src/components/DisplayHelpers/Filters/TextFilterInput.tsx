import React from 'react'
import { IFilterField } from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import { employeeFieldLabels } from '../../../types/Employee'

interface IProps {
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
}

const TextFilterInput = ({ filterField, setFilter }: IProps): JSX.Element => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('--> filterField', filterField)
      const filterFieldClone = Object.assign({}, filterField)
      filterFieldClone.values = [event.target.value]
      setFilter(filterFieldClone)
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
