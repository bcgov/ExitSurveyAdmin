import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import CollectionSelect, ***REMOVED***
  INameValuePair
***REMOVED*** from '../../Interface/Selects/CollectionSelect'
import ***REMOVED*** FilterDispatch ***REMOVED*** from '../FilterForm'
import EnumFilter from '../FilterClasses/EnumFilter'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'

interface IProps ***REMOVED***
  filter: EnumFilter
  resetTimestamp: number
***REMOVED***

export const enumItemsForField = (fieldName: string): INameValuePair[] => ***REMOVED***
  switch (fieldName) ***REMOVED***
    default:
      return [
        ***REMOVED***
          name: 'Name1',
          value: 'name1'
      ***REMOVED***
        ***REMOVED***
          name: 'Name2',
          value: 'name2'
      ***REMOVED***
      ]
***REMOVED***
***REMOVED***

const EnumFilterInput = (***REMOVED*** filter, resetTimestamp ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const dispatch = useContext(FilterDispatch) as FixTypeLater

  const [selectValues, setSelectValues] = React.useState<string[]>([])

  React.useEffect((): void => ***REMOVED***
    const clone = filter.clone()
    clone.enumKeys = selectValues
    dispatch(***REMOVED*** type: 'setFilter', filter: clone ***REMOVED***)
***REMOVED*** [filter, selectValues, dispatch])

  const handleChange = React.useCallback((changeObj): void => ***REMOVED***
    console.log('changeObj', changeObj)
    changeObj == null ? setSelectValues([]) : setSelectValues(changeObj)
***REMOVED*** [])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label=***REMOVED***filter.fieldName***REMOVED***
        items=***REMOVED***enumItemsForField(filter.fieldName)***REMOVED***
        id=***REMOVED***filter.fieldName***REMOVED***
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
