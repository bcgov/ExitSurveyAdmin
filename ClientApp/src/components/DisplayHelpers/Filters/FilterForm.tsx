import React, { useMemo } from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import { IFilterField, employeeFilterFields } from './FilterTypes'
import TextFilterInput from './TextFilterInput'
import DateFilterInput from './DateFilterInput'
import EnumFilterInput from './EnumFilterInput'
import moment from 'moment'
import { defaultFormat } from '../../../helpers/dateHelper'

interface IProps {
  addFilters: (filters: IFilterField[]) => void
  resetFilters: () => void
}

export type FilterMapAction = {
  type: 'setFilter' | 'reset'
  filterField?: IFilterField
}

type FilterMap = { [key: string]: IFilterField }

function reducer(state: FilterMap, action: FilterMapAction): FilterMap {
  const { type, filterField } = action
  const filterMapClone = { ...state }
  switch (type) {
    case 'setFilter':
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      filterMapClone[filterField!.fieldName] = filterField!
      return filterMapClone
    case 'reset':
      return {}
  }
}

export const cloneAndSetValues = (
  filterField: IFilterField,
  values: string[]
): IFilterField => {
  const clone = Object.assign({}, filterField)
  clone.values = values
  return clone
}

export const FilterDispatch = React.createContext({})

const FilterForm = ({ addFilters, resetFilters }: IProps): JSX.Element => {
  const [filterMap, dispatch] = React.useReducer(reducer, {})
  const [resetTimestamp, setResetTimestamp] = React.useState<number>(0)
  const [submitId, setSubmitId] = React.useState<number>(0)

  const formRef = React.useRef<HTMLFormElement>(null)

  const submitForm = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      setSubmitId(submitId + 1)
    },
    [submitId]
  )

  const reset = React.useCallback((): void => {
    dispatch({ type: 'reset' })
    resetFilters()
    setResetTimestamp(Date.now())
  }, [resetFilters, dispatch])

  React.useEffect((): void => {
    addFilters(Object.values(filterMap))
    dispatch({ type: 'reset' })
    formRef.current?.reset()
    setResetTimestamp(Date.now())
    // Note: we only care about submitId here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitId])

  const setActiveUsers = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filterField: {
        fieldName: 'effectiveDate',
        type: 'date',
        values: ['', moment().format(defaultFormat)]
      }
    })
    setSubmitId(submitId + 1)
  }, [submitId])

  const inputs = useMemo(() => {
    return employeeFilterFields.map(
      (field): JSX.Element => {
        let filterComponent
        let colWidth = 2
        switch (field.type) {
          case 'date':
            filterComponent = <DateFilterInput filterField={field} />
            colWidth = 3
            break
          case 'enum':
            filterComponent = (
              <EnumFilterInput
                filterField={field}
                resetTimestamp={resetTimestamp}
              />
            )
            colWidth = 3
            break
          case 'string':
          default:
            filterComponent = <TextFilterInput filterField={field} />
        }
        return (
          <div key={field.fieldName} className={`col-${colWidth}`}>
            {filterComponent}
          </div>
        )
      }
    )
  }, [resetTimestamp])

  return (
    <FilterDispatch.Provider value={dispatch}>
      <div className="FilterForm">
        <form onSubmit={submitForm} ref={formRef}>
          <div className="row">{inputs}</div>
          <div className="row align-items-center">
            <div className="col-6 form-group">
              <p className="mb-1">
                <strong>Predefined filters</strong>
              </p>
              <IconButton
                label="Active users"
                iconName="check"
                colorType="outline-primary"
                marginClasses="mr-2"
                iconMarginClasses="mr-2"
                buttonClasses="btn-sm"
                onClick={setActiveUsers}
              />
            </div>
            <div className="col-6 form-group LabelledItem">
              {/* <label>&nbsp;</label> */}
              <div className="text-right">
                <IconButton
                  label="Set filters"
                  iconName="check"
                  marginClasses="mr-3"
                  iconMarginClasses="mr-2"
                  submit
                />
                <IconButton
                  label="Reset all filters"
                  iconName="undo"
                  colorType="secondary"
                  iconMarginClasses="mr-2"
                  onClick={reset}
                  reset
                />
              </div>
            </div>
          </div>
        </form>
        {/* <hr className="mt-0" /> */}
      </div>
    </FilterDispatch.Provider>
  )
}

export default FilterForm
