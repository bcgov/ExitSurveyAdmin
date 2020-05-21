import React from 'react'
import ReactSelect from 'react-select'
import ***REMOVED*** ValueType ***REMOVED*** from 'react-select/src/types'

import './CollectionSelect.scss'

import styles from '../../../../_common.module.scss'

const ***REMOVED*** baseColor, focusShadowColor, focusBorderColor ***REMOVED*** = styles

export interface IShimEvent ***REMOVED***
  target: ***REMOVED***
    value: string
***REMOVED***
***REMOVED***

export interface INameValuePair ***REMOVED***
  name: string
  value: string
***REMOVED***

export interface ICollectionSelectValue ***REMOVED***
  value: string
  label: string
  isDefault?: boolean
***REMOVED***

export type CollectionSelectReturnValue = string[] | null

export const singleValue = (
  values: CollectionSelectReturnValue
): string | null => ***REMOVED***
  return values != null && Array.isArray(values) && values.length > 0
    ? values[0]
    : null
***REMOVED***

export interface ICollectionSelect<T> ***REMOVED***
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
  triggerReset?: string | null
***REMOVED***

const customReactSelectStyles = ***REMOVED***
  option: (provided: any, state: any): any => (***REMOVED***
    ...provided,
    borderRadius: '0px',
    backgroundColor: state.isSelected
      ? baseColor
      : state.isFocused
      ? focusShadowColor
      : 'white'
***REMOVED***),
  menu: (provided: any, state: any): any => (***REMOVED***
    ...provided,
    borderRadius: '0px'
***REMOVED***),
  control: (provided: any, state: any): any => ***REMOVED***
    const styles = ***REMOVED***
      ...provided,
      boxShadow: 'none',
      borderRadius: '0px',
      '&:focus': ***REMOVED*** borderRadius: '0px' ***REMOVED***
  ***REMOVED***
    if (state.menuIsOpen || state.isFocused) ***REMOVED***
      styles['borderColor'] = focusBorderColor
      styles[':hover'] = ***REMOVED*** borderColor: focusBorderColor ***REMOVED***
      styles['boxShadow'] = `0 0 0 0.2rem $***REMOVED***focusShadowColor***REMOVED***`
  ***REMOVED***
    return styles
***REMOVED***
***REMOVED***

interface IProps<T> extends ICollectionSelect<T> ***REMOVED******REMOVED***

class CollectionSelect<T> extends React.Component<IProps<T>> ***REMOVED***
  public constructor(props: IProps<T>) ***REMOVED***
    super(props)
    this.onChange = this.onChange.bind(this)
***REMOVED***

  protected onChange(selectedItems: ValueType<ICollectionSelectValue>): void ***REMOVED***
    console.log('selectedItems', selectedItems)
    if (selectedItems != null && !Array.isArray(selectedItems)) ***REMOVED***
      // Selected items is not an array. But for simplicity, we want to return
      // it as such everywhere, even when multiselect is not enabled. So
      // make the selected item into an array.
      const value = (selectedItems as ICollectionSelectValue).value
      if (value === '') ***REMOVED***
        this.props.onChangeCallback(null)
    ***REMOVED*** else ***REMOVED***
        this.props.onChangeCallback([value]) // Note we put the value in an array.
    ***REMOVED***
  ***REMOVED*** else if (Array.isArray(selectedItems)) ***REMOVED***
      // It's an array; just map and return
      const values = selectedItems.map(item => item.value)
      console.log('values', values)
      this.props.onChangeCallback(values)
  ***REMOVED*** else ***REMOVED***
      // It's probably null.
      this.props.onChangeCallback(null)
  ***REMOVED***
***REMOVED***

  protected mapItems(items: T[]): ICollectionSelectValue[] ***REMOVED***
    return items.map(variable => ***REMOVED***
      const value = this.props.valueAccessor
        ? this.props.valueAccessor(variable)
        : ''
      const label = this.props.nameAccessor
        ? this.props.nameAccessor(variable)
        : ''
      const isDefault = this.props.defaultValueKeys
        ? this.props.defaultValueKeys.includes(value)
        : false

      return ***REMOVED*** label, value, isDefault ***REMOVED***
  ***REMOVED***)
***REMOVED***

  public render(): JSX.Element ***REMOVED***
    const items = this.props.items
    const options = items && items.length ? this.mapItems(items) : []
    const defaultOptions = this.props.defaultValueKeys
      ? options.filter(option => option.isDefault)
      : undefined

    // We can trigger a reset of the contents by calling triggerReset with null.
    const triggerReset: ValueType<***REMOVED*** value: string; label: string ***REMOVED***> = this.props
      .triggerReset
      ? null
      : undefined

    const placeholder = this.props.placeholder

    return (
      <div className=***REMOVED***'form-group ' + this.props.className***REMOVED***>
        ***REMOVED***this.props.label && (
          <label htmlFor=***REMOVED***this.props.id***REMOVED***>***REMOVED***this.props.label***REMOVED***</label>
        )***REMOVED***
        <ReactSelect
          id=***REMOVED***this.props.id***REMOVED***
          onChange=***REMOVED***this.onChange***REMOVED***
          isMulti=***REMOVED***this.props.isMultiSelect***REMOVED***
          className="ReactSelect form-control"
          options=***REMOVED***options***REMOVED***
          defaultValue=***REMOVED***defaultOptions***REMOVED***
          styles=***REMOVED***customReactSelectStyles***REMOVED***
          value=***REMOVED***triggerReset***REMOVED***
          placeholder=***REMOVED***placeholder***REMOVED***
          isClearable
        />
      </div>
    )
***REMOVED***
***REMOVED***

export default CollectionSelect
