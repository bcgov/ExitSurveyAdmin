import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  { name: 'Treatment 1', value: 'treatment1' },
  { name: 'Treatment 2', value: 'treatment2' },
  { name: 'Treatment 3', value: 'treatment3' }
]

export default class TreatmentSelect extends React.Component {
  render(): JSX.Element {
    return (
      <CollectionSelect
        label={'Treatment'}
        items={ITEMS}
        id={'TreatmentSelect'}
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
