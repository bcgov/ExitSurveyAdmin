import React, ***REMOVED*** useContext ***REMOVED*** from 'react'

import CollectionSelect, ***REMOVED***
  INameValuePair
***REMOVED*** from '../../Interface/Selects/CollectionSelect'
import ***REMOVED*** FilterDispatch ***REMOVED*** from '../FilterForm'
import EnumFilter from '../FilterClasses/EnumFilter'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../../types/FixTypeLater'
import ***REMOVED*** labelFor, optionsFor ***REMOVED*** from '../../../../helpers/labelHelper'

interface IProps ***REMOVED***
  filter: EnumFilter
  resetTimestamp: number
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
    // console.log('changeObj', changeObj)
    changeObj == null ? setSelectValues([]) : setSelectValues(changeObj)
***REMOVED*** [])

  return (
    <div className="LabelledItem">
      <CollectionSelect<INameValuePair>
        label=***REMOVED***labelFor(filter.fieldName)***REMOVED***
        items=***REMOVED***optionsFor(filter.fieldName)***REMOVED***
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
