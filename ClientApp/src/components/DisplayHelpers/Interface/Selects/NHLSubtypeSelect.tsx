import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  { name: 'Subtype 1', value: 'subtype1' },
  { name: 'Subtype 2', value: 'subtype2' },
  { name: 'Subtype 3', value: 'subtype3' }
]

export default class NHLSubtype extends React.Component {
  render(): JSX.Element {
    return (
      <CollectionSelect
        label={'NHL Subtype'}
        items={ITEMS}
        id={'NHLSubtype'}
        nameAccessor={(item): string => item.name}
        valueAccessor={(item): string => item.value}
        onChangeCallback={(item): void => {
          console.log('item', item)
        }}
        placeholder={'None selected'}
        isMultiSelect
      />
    )
  }
}
