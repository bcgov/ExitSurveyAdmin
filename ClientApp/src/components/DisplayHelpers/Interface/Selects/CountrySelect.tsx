import React from 'react'
import CollectionSelect from './CollectionSelect'

const ITEMS = [
  { name: '🌍 International', value: 'international' },
  { name: '🇨🇦 Canada', value: 'ca' },
  { name: '🇺🇸 United States', value: 'us' },
  { name: '🇩🇪 Germany', value: 'de' },
  { name: '🇮🇹 Italy', value: 'it' },
  { name: '🇬🇧 United Kingdom', value: 'uk' }
]

export default class CountrySelect extends React.Component {
  render(): JSX.Element {
    return (
      <CollectionSelect
        label={'Country'}
        items={ITEMS}
        id={'CountrySelect'}
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
