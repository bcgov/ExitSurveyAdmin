import { FilterType, IFilter } from './FilterTypes'

const OR_OPERATOR = '|'

export default class TextFilter implements IFilter {
  _type = FilterType.String
  _fieldName: string
  _values: string[]

  constructor(fieldName: string, values?: string[]) {
    this._fieldName = fieldName
    this._values = values || []
  }

  get type(): FilterType {
    return this._type
  }

  get fieldName(): string {
    return this._fieldName
  }

  set values(newValues: string[]) {
    this._values = newValues
  }

  reset(): void {
    this._values = []
  }

  get isSet(): boolean {
    return this._values.length >= 1
  }

  get mustReplace(): boolean {
    return false
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`TextFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    return `${this._fieldName}@=${this._values.join(OR_OPERATOR)}`
  }

  decode(inputs: string[]): TextFilter {
    const values: string[] = []
    const fieldName = inputs[0].split('@=')[0]
    inputs.forEach(input => {
      const valueString = input.split('@=')[1]
      if (!fieldName || !valueString) {
        throw new Error(`TextFilter: Could not parse input '${input}'`)
      }
      valueString.split(OR_OPERATOR).forEach(v => values.push(v))
    })
    return new TextFilter(fieldName, values)
  }

  clone(): TextFilter {
    return new TextFilter(this._fieldName, this._values)
  }

  get displayString(): string {
    return this._values.join(' or ')
  }
}
