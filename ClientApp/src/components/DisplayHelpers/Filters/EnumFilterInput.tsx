import React from 'react'

import { IFilterField } from './FilterTypes'
import { employeeFieldLabels } from '../../../types/Employee'

import CollectionSelect, {
  INameValuePair
} from '../Interface/Selects/CollectionSelect'
import { EmployeeStatus } from '../../../types/EmployeeStatusEnum'

interface IProps {
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
  resetTimestamp: number
}

export const enumItemsForField = (fieldName: string): INameValuePair[] => {
  switch (fieldName) {
    case 'currentEmployeeStatusCode':
    default:
      return EmployeeStatus.statusArray().map(s => ({
        name: s.displayName,
        value: s.code
      }))
  }
}

const EnumFilterInput = ({
  filterField,
  setFilter,
  resetTimestamp
}: IProps): JSX.Element => {
  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => {
    const filterFieldClone = Object.assign({}, filterField)
    filterFieldClone.values = [...selectValues]
    setFilter(filterFieldClone)
  }, [selectValues])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label={employeeFieldLabels[filterField.fieldName]}
        items={enumItemsForField(filterField.fieldName)}
        id={filterField.fieldName}
        nameAccessor={(item): string => item.name}
        valueAccessor={(item): string => item.value}
        onChangeCallback={(changeObj): void => {
          if (Array.isArray(changeObj)) {
            setSelectValues(changeObj)
          } else {
            setSelectValues([(changeObj as unknown) as string]) // Wrap as array
          }
        }}
        key={`${resetTimestamp}`}
        placeholder={'None selected'}
        isMultiSelect
      />
    </div>
  )
}

export default EnumFilterInput
