import { FilterHandler, IFilterField } from './FilterTypes'

const OR_OPERATOR = '|'

export default class EnumFilterHandler extends FilterHandler {
  static _instance: EnumFilterHandler

  encode(filterField: IFilterField): string {
    if (!filterField.values || filterField.values.length < 1) {
      console.warn('EnumFilter: filterField.values is falsy or < 1 length')
      return ''
    }
    // Joins the items with ORs, e.g. status@=new|email_sent|reminder_1
    return `${filterField.fieldName}@=${filterField.values.join(OR_OPERATOR)}`
  }

  decode(input: string[]): IFilterField {
    // This takes multiple values, but will only use the first one.
    const [column, filterValue] = input[0].split('@=')
    if (!column || !filterValue) {
      throw `TextFilter: Could not parse input '${input}'`
    }

    const orValues = filterValue.split(OR_OPERATOR)

    return {
      fieldName: column,
      type: 'string',
      values: orValues
    }
  }

  static instance(): EnumFilterHandler {
    if (!this._instance) {
      this._instance = new EnumFilterHandler()
    }
    return this._instance
  }
}
