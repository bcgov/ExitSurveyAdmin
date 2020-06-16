import React, { useContext } from 'react'

import CollectionSelect, {
  INameValuePair
} from '../../Interface/Selects/CollectionSelect'
import { FilterDispatch } from '../FilterForm'
import EnumFilter from '../FilterClasses/EnumFilter'
import { FixTypeLater } from '../../../../types/FixTypeLater'
import { labelFor, optionsFor } from '../../../../helpers/labelHelper'

interface IProps {
  filter: EnumFilter
  resetTimestamp: number
}

export const enumItemsForField = (fieldName: string): INameValuePair[] => {
  switch (fieldName) {
    default:
      return [
        {
          name: 'Name1',
          value: 'name1'
        },
        {
          name: 'Name2',
          value: 'name2'
        }
      ]
  }
}

const EnumFilterInput = ({ filter, resetTimestamp }: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => {
    const clone = filter.clone()
    clone.enumKeys = selectValues
    dispatch({ type: 'setFilter', filter: clone })
  }, [filter, selectValues, dispatch])

  const handleChange = React.useCallback((changeObj): void => {
    // console.log('changeObj', changeObj)
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
