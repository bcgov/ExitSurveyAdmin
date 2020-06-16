/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import {
  FilterType,
  IFilter,
  filterableFields
} from './FilterClasses/FilterTypes'
import TextFilterInput from './Inputs/TextFilterInput'
import DateFilterInput from './Inputs/DateFilterInput'
import EnumFilterInput from './Inputs/EnumFilterInput'
import moment from 'moment'
import DateFilter from './FilterClasses/DateFilter'
import EnumFilter from './FilterClasses/EnumFilter'
import TextFilter from './FilterClasses/TextFilter'

interface IProps {
  addFilters: (filters: IFilter[]) => void
  resetFilters: () => void
}

export type FilterMapAction = {
  type: 'setFilter' | 'reset'
  filter?: IFilter
}

type FilterMap = { [key: string]: IFilter }

function reducer(state: FilterMap, action: FilterMapAction): FilterMap {
  const { type, filter } = action
  const filterMapClone = { ...state }
  switch (type) {
    case 'setFilter':
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      filterMapClone[filter!.fieldName] = filter!
      return filterMapClone
    case 'reset':
      return {}
  }
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
    formRef.current!.reset()
    setResetTimestamp(Date.now())
    // Note: we only care about submitId here.
  }, [submitId])

  const setLastNMonths = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: new DateFilter(
        'effectiveDate',
        moment()
          .subtract(6, 'months')
          .toDate(),
        undefined
      )
    })
    setSubmitId(submitId + 1)
  }, [submitId])

  const setActiveUsers = React.useCallback((): void => {
    dispatch({
      type: 'setFilter',
      filter: new DateFilter('effectiveDate', undefined, new Date())
    })
    setSubmitId(submitId + 1)
  }, [submitId])

  const inputs = useMemo(() => {
    return filterableFields.map(
      (filter): JSX.Element => {
        let filterComponent
        let colWidth = 2
        switch (filter.type) {
          case FilterType.Date:
            filterComponent = (
              <DateFilterInput
                filter={filter as DateFilter}
                resetTimestamp={resetTimestamp}
              />
            )
            colWidth = 3
            break
          case FilterType.Enum:
            filterComponent = (
              <EnumFilterInput
                filter={filter as EnumFilter}
                resetTimestamp={resetTimestamp}
              />
            )
            colWidth = 3
            break
          case FilterType.String:
          default:
            filterComponent = <TextFilterInput filter={filter as TextFilter} />
        }
        return (
          <div key={filter.fieldName} className={`col-${colWidth}`}>
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
                label="Effective date in last 6 months"
                iconName="check"
                colorType="outline-primary"
                marginClasses="mr-2"
                iconMarginClasses="mr-2"
                buttonClasses="btn-sm"
                onClick={setLastNMonths}
              />
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
