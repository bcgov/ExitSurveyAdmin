import React from 'react'
import { FilterHandler, IFilterField } from './FilterTypes'
import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import { employeeFieldLabels } from '../../../types/Employee'

export class TextFilterHandler extends FilterHandler {
  static _instance: TextFilterHandler = new TextFilterHandler()

  encode(filterField: IFilterField): string {
    if (!filterField.values || filterField.values.length !== 1) {
      console.warn('TextFilter: filterField.values is falsy or != 1 length')
      return ''
    }
    return `${filterField.fieldName}@=${filterField.values[0]}`
  }

  decode(input: string): IFilterField {
    const [column, filterValue] = input.split('@=')
    if (!column || !filterValue) {
      throw `TextFilter: Could not parse input '${input}'`
    }
    return {
      fieldName: column,
      type: 'string',
      values: [filterValue]
    }
  }

  static instance(): TextFilterHandler {
    return this._instance
  }
}

interface IProps {
  filterField: IFilterField
  setFilter: (filterField: IFilterField) => void
}

const TextFilterInput = ({ filterField, setFilter }: IProps): JSX.Element => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterFieldClone = Object.assign({}, filterField)
      filterFieldClone.values = [event.target.value]
      setFilter(filterFieldClone)
    },
    [filterField]
  )

  return (
    <LabelledInput
      title={employeeFieldLabels[filterField.fieldName]}
      name={filterField.fieldName}
      onChange={handleChange}
    />
  )
}

export default TextFilterInput
