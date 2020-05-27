import React, { useContext } from 'react'

import { IFilterField } from './FilterTypes'
import { employeeFieldLabels } from '../../../types/Employee'

import CollectionSelect, {
  INameValuePair
} from '../Interface/Selects/CollectionSelect'
import { EmployeeStatus } from '../../../types/EmployeeStatusEnum'
import { Reason } from '../../../types/ReasonEnum'
import { FilterDispatch, cloneAndSetValues } from './FilterForm'
import { FixTypeLater } from '../../../types/FixTypeLater'

interface IProps {
  filterField: IFilterField
  // setFilter: (filterField: IFilterField) => void
  resetTimestamp: number
}

const reasonSort = (a: Reason, b: Reason): number => {
  return a.reasonCode.localeCompare(b.reasonCode)
}

export const enumItemsForField = (fieldName: string): INameValuePair[] => {
  switch (fieldName) {
    case 'reason':
      return Object.values(Reason.reasonDictionary())
        .sort(reasonSort)
        .map(s => ({
          name: s.reasonCode,
          value: s.reasonCode
        }))
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
  resetTimestamp
}: IProps): JSX.Element => {
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => {
    const clone = cloneAndSetValues(filterField, [...selectValues])
    dispatch({ type: 'setFilter', filterField: clone })
  }, [filterField, selectValues])

  const handleChange = React.useCallback((changeObj): void => {
    console.log('changeObj', changeObj)
    changeObj == null ? setSelectValues([]) : setSelectValues(changeObj)
  }, [])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label={employeeFieldLabels[filterField.fieldName]}
        items={enumItemsForField(filterField.fieldName)}
        id={filterField.fieldName}
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
