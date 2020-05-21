import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  ***REMOVED*** name: 'Clinical single-arm trial', value: 'clinicalSingleArmTrial' ***REMOVED***,
  ***REMOVED*** name: 'Observational retrospective', value: 'observationalRetrospective' ***REMOVED***
]

export default class StudyDesignSelect extends React.Component ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CollectionSelect
        label=***REMOVED***'Study design'***REMOVED***
        items=***REMOVED***ITEMS***REMOVED***
        id=***REMOVED***'StudyDesignSelect'***REMOVED***
        nameAccessor=***REMOVED***(item): string => item.name***REMOVED***
        valueAccessor=***REMOVED***(item): string => item.value***REMOVED***
        onChangeCallback=***REMOVED***(item): void => ***REMOVED***
          console.log('item', item)
      ***REMOVED******REMOVED***
        placeholder=***REMOVED***'None selected'***REMOVED***
      />
    )
***REMOVED***
***REMOVED***
