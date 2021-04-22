import React from 'react'
import ReactSelect from 'react-select'
import { ValueType } from 'react-select/src/types'

import { FixTypeLater } from '../../../../types/FixTypeLater'

import './CollectionSelect.scss'
import styles from '../../../../_common.module.scss'

const { baseColor, focusShadowColor, focusBorderColor } = styles

export interface IShimEvent {
  target: {
    value: string
  }
}

export interface INameValuePair {
  name: string
  value: string
}

export interface ICollectionSelectValue {
  value: string
  label: string
  isDefault?: boolean
}

export type CollectionSelectReturnValue = string[] | null

export const singleValue = (
  values: CollectionSelectReturnValue
): string | null => {
  return values != null && Array.isArray(values) && values.length > 0
    ? values[0]
    : null
}

export interface ICollectionSelect<T> {
  suppressLabel?: boolean
  valueAccessor?: (item: T) => string
  nameAccessor?: (item: T) => string
  onChangeCallback: (selectedValues: CollectionSelectReturnValue) => void
  includeBlank?: boolean
  label?: string
  placeholder?: React.ReactNode
  className?: string
  id?: string
  items?: T[]
  excludeNames?: string[]
  excludeValues?: string[]
  defaultValueKeys?: string[]
  isMultiSelect?: boolean
}

const customReactSelectStyles = {
  option: (provided: FixTypeLater, state: FixTypeLater): FixTypeLater => ({
    ...provided,
    borderRadius: '0px',
    backgroundColor: state.isSelected
      ? baseColor
      : state.isFocused
      ? focusShadowColor
      : 'white'
  }),
  menu: (provided: FixTypeLater): FixTypeLater => ({
    ...provided,
    borderRadius: '0px'
  }),
  control: (provided: FixTypeLater, state: FixTypeLater): FixTypeLater => {
    const styles = {
      ...provided,
      boxShadow: 'none',
      borderRadius: '0px',
      '&:focus': { borderRadius: '0px' }
    }
    if (state.menuIsOpen || state.isFocused) {
      styles['borderColor'] = focusBorderColor
      styles[':hover'] = { borderColor: focusBorderColor }
      styles['boxShadow'] = `0 0 0 0.2rem ${focusShadowColor}`
    }
    return styles
  }
}

interface IProps<T> extends ICollectionSelect<T> {}

class CollectionSelect<T> extends React.Component<IProps<T>> {
  public constructor(props: IProps<T>) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  protected onChange(
    selectedItems: ValueType<ICollectionSelectValue, FixTypeLater>
  ): void {
    if (selectedItems != null && !Array.isArray(selectedItems)) {
      // Selected items is not an array. But for simplicity, we want to return
      // it as such everywhere, even when multiselect is not enabled. So
      // make the selected item into an array.
      const value = (selectedItems as ICollectionSelectValue).value
      if (value === '') {
        this.props.onChangeCallback(null)
      } else {
        this.props.onChangeCallback([value]) // Note we put the value in an array.
      }
    } else if (Array.isArray(selectedItems)) {
      // It's an array; just map and return
      const values = selectedItems.map(item => item.value)
      this.props.onChangeCallback(values)
    } else {
      // It's probably null.
      this.props.onChangeCallback(null)
    }
  }

  protected mapItems(items: T[]): ICollectionSelectValue[] {
    return items.map(variable => {
      const value = this.props.valueAccessor
        ? this.props.valueAccessor(variable)
        : ''
      const label = this.props.nameAccessor
        ? this.props.nameAccessor(variable)
        : ''
      const isDefault = this.props.defaultValueKeys
        ? this.props.defaultValueKeys.includes(value)
        : false

      return { label, value, isDefault }
    })
  }

  public render(): JSX.Element {
    const items = this.props.items
    const options = items && items.length ? this.mapItems(items) : []
    const defaultOptions = this.props.defaultValueKeys
      ? options.filter(option => option.isDefault)
      : undefined

    const placeholder = this.props.placeholder

    return (
      <div className={'form-group ' + this.props.className}>
        {this.props.label && (
          <label htmlFor={this.props.id}>{this.props.label}</label>
        )}
        <ReactSelect
          id={this.props.id}
          onChange={this.onChange}
          isMulti={this.props.isMultiSelect}
          className="ReactSelect form-control"
          options={options}
          defaultValue={defaultOptions}
          styles={customReactSelectStyles}
          placeholder={placeholder}
          isClearable
        />
      </div>
    )
  }
}

export default CollectionSelect
