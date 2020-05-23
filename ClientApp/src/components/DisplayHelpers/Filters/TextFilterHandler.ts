import { FilterHandler, IFilterField } from './FilterTypes'
import { FixTypeLater } from '../../../types/FixTypeLater'

export default class TextFilterHandler extends FilterHandler {
  static _instance: FixTypeLater

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
    if (!this._instance) {
      this._instance = new TextFilterHandler()
    }
    return this._instance
  }
}
