import React from 'react'

import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

import CollectionSelect, ***REMOVED***
  INameValuePair
***REMOVED*** from '../Interface/Selects/CollectionSelect'
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../../types/EmployeeStatusEnum'

interface IProps ***REMOVED***
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
  resetTimestamp: number
***REMOVED***

export const enumItemsForField = (fieldName: string): INameValuePair[] => ***REMOVED***
  switch (fieldName) ***REMOVED***
    case 'currentEmployeeStatusCode':
    default:
      return EmployeeStatus.statusArray().map(s => (***REMOVED***
        name: s.displayName,
        value: s.code
    ***REMOVED***))
***REMOVED***
***REMOVED***

const EnumFilterInput = (***REMOVED***
  filterField,
  setFilter,
  resetTimestamp
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => ***REMOVED***
    const filterFieldClone = Object.assign(***REMOVED******REMOVED***, filterField)
    filterFieldClone.values = [...selectValues]
    setFilter(filterFieldClone)
***REMOVED*** [selectValues])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label=***REMOVED***employeeFieldLabels[filterField.fieldName]***REMOVED***
        items=***REMOVED***enumItemsForField(filterField.fieldName)***REMOVED***
        id=***REMOVED***filterField.fieldName***REMOVED***
        nameAccessor=***REMOVED***(item): string => item.name***REMOVED***
        valueAccessor=***REMOVED***(item): string => item.value***REMOVED***
        onChangeCallback=***REMOVED***(changeObj): void => ***REMOVED***
          if (Array.isArray(changeObj)) ***REMOVED***
            setSelectValues(changeObj)
        ***REMOVED*** else ***REMOVED***
            setSelectValues([(changeObj as unknown) as string]) // Wrap as array
        ***REMOVED***
      ***REMOVED******REMOVED***
        key=***REMOVED***`$***REMOVED***resetTimestamp***REMOVED***`***REMOVED*** // Kind of hacky way to reset values
        placeholder=***REMOVED***'None selected'***REMOVED***
        isMultiSelect
      />
    </div>
  )
***REMOVED***

export default EnumFilterInput
