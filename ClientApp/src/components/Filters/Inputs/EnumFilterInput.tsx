import React, { useContext } from 'react'

import { FilterDispatch } from '../FilterForm'
import { FixTypeLater } from '../../../types/FixTypeLater'
import { labelFor, optionsFor } from '../../../helpers/labelHelper'
import CollectionSelect, {
  INameValuePair,
} from '../../DisplayHelpers/Interface/Selects/CollectionSelect'
import EnumFilter from '../FilterClasses/EnumFilter'

interface Props {
  filter: EnumFilter
  resetTimestamp: number
}

const EnumFilterInput = ({ filter, resetTimestamp }: Props): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => {
    const clone = filter.clone()
    clone.enumKeys = selectValues
    dispatch({ type: 'setFilter', filter: clone })
  }, [filter, selectValues, dispatch])

  const handleChange = React.useCallback((changeObj: FixTypeLater): void => {
    changeObj == null ? setSelectValues([]) : setSelectValues(changeObj)
  }, [])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label={labelFor(filter.fieldName)}
        items={optionsFor(filter.fieldName)}
        id={filter.fieldName}
        nameAccessor={(item): string => item.name}
        valueAccessor={(item): string => item.value}
        onChangeCallback={handleChange}
        key={`${resetTimestamp}`} // Kind of hacky way to reset values
        placeholder={'None selected'}
        isMultiSelect
      />
    </div>
  )
}

export default EnumFilterInput
