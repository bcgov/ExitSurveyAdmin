import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  ***REMOVED*** name: 'Subtype 1', value: 'subtype1' ***REMOVED***,
  ***REMOVED*** name: 'Subtype 2', value: 'subtype2' ***REMOVED***,
  ***REMOVED*** name: 'Subtype 3', value: 'subtype3' ***REMOVED***
]

export default class NHLSubtype extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CollectionSelect
        label=***REMOVED***'NHL Subtype'***REMOVED***
        items=***REMOVED***ITEMS***REMOVED***
        id=***REMOVED***'NHLSubtype'***REMOVED***
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
