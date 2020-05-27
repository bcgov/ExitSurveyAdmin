import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

import CollectionSelect, ***REMOVED***
  INameValuePair
***REMOVED*** from '../Interface/Selects/CollectionSelect'
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../../types/EmployeeStatusEnum'
import ***REMOVED*** Reason ***REMOVED*** from '../../../types/ReasonEnum'
import ***REMOVED*** FilterDispatch, cloneAndSetValues ***REMOVED*** from './FilterForm'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

interface IProps ***REMOVED***
  filterField: IFilterField
  // setFilter: (filterField: IFilterField) => void
  resetTimestamp: number
***REMOVED***

const reasonSort = (a: Reason, b: Reason): number => ***REMOVED***
  return a.reasonCode.localeCompare(b.reasonCode)
***REMOVED***

export const enumItemsForField = (fieldName: string): INameValuePair[] => ***REMOVED***
  switch (fieldName) ***REMOVED***
    case 'reason':
      return Object.values(Reason.reasonDictionary())
        .sort(reasonSort)
        .map(s => (***REMOVED***
          name: s.reasonCode,
          value: s.reasonCode
      ***REMOVED***))
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
  resetTimestamp
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => ***REMOVED***
    const clone = cloneAndSetValues(filterField, [...selectValues])
    dispatch(***REMOVED*** type: 'setFilter', filterField: clone ***REMOVED***)
***REMOVED*** [filterField, selectValues, dispatch])

  const handleChange = React.useCallback((changeObj): void => ***REMOVED***
    console.log('changeObj', changeObj)
    changeObj == null ? setSelectValues([]) : setSelectValues(changeObj)
***REMOVED*** [])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label=***REMOVED***employeeFieldLabels[filterField.fieldName]***REMOVED***
        items=***REMOVED***enumItemsForField(filterField.fieldName)***REMOVED***
        id=***REMOVED***filterField.fieldName***REMOVED***
        nameAccessor=***REMOVED***(item): string => item.name***REMOVED***
        valueAccessor=***REMOVED***(item): string => item.value***REMOVED***
        onChangeCallback=***REMOVED***handleChange***REMOVED***
        key=***REMOVED***`$***REMOVED***resetTimestamp***REMOVED***`***REMOVED*** // Kind of hacky way to reset values
        placeholder=***REMOVED***'None selected'***REMOVED***
        isMultiSelect
      />
    </div>
  )
***REMOVED***

export default EnumFilterInput
