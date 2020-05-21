import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  ***REMOVED*** name: 'Treatment 1', value: 'treatment1' ***REMOVED***,
  ***REMOVED*** name: 'Treatment 2', value: 'treatment2' ***REMOVED***,
  ***REMOVED*** name: 'Treatment 3', value: 'treatment3' ***REMOVED***
]

export default class TreatmentSelect extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CollectionSelect
        label=***REMOVED***'Treatment'***REMOVED***
        items=***REMOVED***ITEMS***REMOVED***
        id=***REMOVED***'TreatmentSelect'***REMOVED***
        nameAccessor=***REMOVED***(item): string => item.name***REMOVED***
        valueAccessor=***REMOVED***(item): string => item.value***REMOVED***
        onChangeCallback=***REMOVED***(item): void => ***REMOVED***
          console.log('item', item)
      ***REMOVED******REMOVED***
        placeholder=***REMOVED***'None selected'***REMOVED***
        isMultiSelect
      />
    )
***REMOVED***
***REMOVED***
