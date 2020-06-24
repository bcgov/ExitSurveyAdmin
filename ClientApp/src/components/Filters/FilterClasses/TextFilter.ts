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
    // Special case where all values are blank; this is how we search for empty
    // items, per https://github.com/Biarity/Sieve/issues/50
    if (this._values.every((v: string) => v.length === 0)) {
      return `${this._fieldName}==${OR_OPERATOR}`
    }
    return `${this._fieldName}@=${this._values.join(OR_OPERATOR)}`
  }

  decode(inputs: string[]): TextFilter {
    const values: string[] = []
    let fieldName = inputs[0].split('@=')[0]
    for (const input of inputs) {
      let valueString = input.split('@=')[1]
      if (!fieldName || !valueString) {
        // This might be the special case from above; try splitting on the ==
        ;[fieldName, valueString] = input.split('==')
        if (valueString) {
          return new TextFilter(fieldName, ['', ''])
        } else {
          // If still no valueString, throw an error
          throw new Error(`TextFilter: Could not parse input '${input}'`)
        }
      }
      valueString.split(OR_OPERATOR).forEach(v => values.push(v))
    }
    return new TextFilter(fieldName, values)
  }

  clone(): TextFilter {
    const clone = new TextFilter(this._fieldName, this._values)
    return clone
  }

  get displayString(): string {
    // Special case for all blanks
    if (this._values.every(v => v.length === 0)) {
      return 'is blank'
    } else {
      return this._values.join(' or ')
    }
  }
}
