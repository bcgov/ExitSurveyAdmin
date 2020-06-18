import React, { useContext } from 'react'
import LabelledInput from '../../Interface/LabelledItems/LabelledInput'
import { FilterDispatch } from '../FilterForm'
import TextFilter from '../FilterClasses/TextFilter'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import { labelFor } from '../../../../helpers/labelHelper'

interface IProps {
  filter: TextFilter
}

const TextFilterInput = ({ filter }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const clone = filter.clone()
      clone.values = [event.target.value]
      dispatch({ type: 'setFilter', filter: clone })
    },
    [filter, dispatch]
  )

  return (
    <LabelledInput
      title={labelFor(filter.fieldName)}
      name={filter.fieldName}
      onChange={handleChange}
    />
  )
}

export default TextFilterInput
