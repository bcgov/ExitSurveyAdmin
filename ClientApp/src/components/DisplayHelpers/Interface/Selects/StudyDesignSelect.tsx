import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  { name: 'Clinical single-arm trial', value: 'clinicalSingleArmTrial' },
  { name: 'Observational retrospective', value: 'observationalRetrospective' }
]

export default class StudyDesignSelect extends React.Component {
  render(): JSX.Element {
    return (
      <CollectionSelect
        label={'Study design'}
        items={ITEMS}
        id={'StudyDesignSelect'}
        nameAccessor={(item): string => item.name}
        valueAccessor={(item): string => item.value}
        onChangeCallback={(item): void => {
          console.log('item', item)
        }}
        placeholder={'None selected'}
      />
    )
  }
}
