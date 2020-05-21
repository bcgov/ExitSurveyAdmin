import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  ***REMOVED*** name: '🌍 International', value: 'international' ***REMOVED***,
  ***REMOVED*** name: '🇨🇦 Canada', value: 'ca' ***REMOVED***,
  ***REMOVED*** name: '🇺🇸 United States', value: 'us' ***REMOVED***,
  ***REMOVED*** name: '🇩🇪 Germany', value: 'de' ***REMOVED***,
  ***REMOVED*** name: '🇮🇹 Italy', value: 'it' ***REMOVED***,
  ***REMOVED*** name: '🇬🇧 United Kingdom', value: 'uk' ***REMOVED***
]

export default class CountrySelect extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CollectionSelect
        label=***REMOVED***'Country'***REMOVED***
        items=***REMOVED***ITEMS***REMOVED***
        id=***REMOVED***'CountrySelect'***REMOVED***
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
