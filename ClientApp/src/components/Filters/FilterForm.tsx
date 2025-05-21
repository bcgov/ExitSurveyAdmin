/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, ***REMOVED*** useMemo ***REMOVED*** from 'react'

import ***REMOVED*** FilterType, Filter ***REMOVED*** from './FilterClasses/FilterTypes'
import ***REMOVED*** PresetProps ***REMOVED*** from './Presets/PresetProps'
import DateFilter from './FilterClasses/DateFilter'
import DateFilterInput from './Inputs/DateFilterInput'
import EnumFilter from './FilterClasses/EnumFilter'
import EnumFilterInput from './Inputs/EnumFilterInput'
import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'
import TextFilter from './FilterClasses/TextFilter'
import TextFilterInput from './Inputs/TextFilterInput'

interface Props ***REMOVED***
  addFilters: (filters: Filter[]) => void
  resetFilters: () => void
  filterableFields: Filter[]
  presetComponent?: React.ComponentType<PresetProps>
***REMOVED***

export type FilterMapAction = ***REMOVED***
  type: 'setFilter' | 'reset'
  filter?: Filter
***REMOVED***

type FilterMap = ***REMOVED*** [key: string]: Filter ***REMOVED***

function reducer(state: FilterMap, action: FilterMapAction): FilterMap ***REMOVED***
  const ***REMOVED*** type, filter ***REMOVED*** = action
  const filterMapClone = ***REMOVED*** ...state ***REMOVED***
  switch (type) ***REMOVED***
    case 'setFilter':
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      filterMapClone[filter!.fieldName] = filter!
      return filterMapClone
    case 'reset':
      return ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***

export const FilterDispatch = React.createContext(***REMOVED******REMOVED***)

const FilterForm = (***REMOVED***
  addFilters,
  resetFilters,
  filterableFields,
  presetComponent,
***REMOVED***: Props): JSX.Element => ***REMOVED***
  const [filterMap, dispatch] = React.useReducer(reducer, ***REMOVED******REMOVED***)
  const [resetTimestamp, setResetTimestamp] = React.useState<number>(0)
  const [submitId, setSubmitId] = React.useState<number>(0)

  const formRef = React.useRef<HTMLFormElement>(null)

  const submitForm = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
      event.preventDefault()
      setSubmitId(submitId + 1)
  ***REMOVED***
    [submitId]
  )

  const reset = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED*** type: 'reset' ***REMOVED***)
    resetFilters()
    setResetTimestamp(Date.now())
***REMOVED*** [resetFilters, dispatch])

  React.useEffect((): void => ***REMOVED***
    addFilters(Object.values(filterMap))
    dispatch(***REMOVED*** type: 'reset' ***REMOVED***)
    formRef.current!.reset()
    setResetTimestamp(Date.now())
    // Note: we only care about submitId here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
***REMOVED*** [submitId])

  const inputs = useMemo(() => ***REMOVED***
    // Ignore Custom fields
    return filterableFields
      .filter((f) => f.type !== FilterType.Custom)
      .map((filter): JSX.Element => ***REMOVED***
        let filterComponent
        let colWidth = 2
        switch (filter.type) ***REMOVED***
          case FilterType.Date:
            filterComponent = (
              <DateFilterInput
                filter=***REMOVED***filter as DateFilter***REMOVED***
                resetTimestamp=***REMOVED***resetTimestamp***REMOVED***
              />
            )
            colWidth = 2
            break
          case FilterType.Enum:
            filterComponent = (
              <EnumFilterInput
                filter=***REMOVED***filter as EnumFilter***REMOVED***
                resetTimestamp=***REMOVED***resetTimestamp***REMOVED***
              />
            )
            break
          case FilterType.String:
          default:
            filterComponent = <TextFilterInput filter=***REMOVED***filter as TextFilter***REMOVED*** />
      ***REMOVED***
        return (
          <div key=***REMOVED***filter.fieldName***REMOVED*** className=***REMOVED***`col-$***REMOVED***colWidth***REMOVED***`***REMOVED***>
            ***REMOVED***filterComponent***REMOVED***
          </div>
        )
    ***REMOVED***)
***REMOVED*** [resetTimestamp, filterableFields])

  const PresetComponent = presetComponent

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <div className="FilterForm">
        <form onSubmit=***REMOVED***submitForm***REMOVED*** ref=***REMOVED***formRef***REMOVED***>
          <div className="row">***REMOVED***inputs***REMOVED***</div>
          <div className="row align-items-center mt-2">
            <div className="col-8 form-group mb-0">
              ***REMOVED***PresetComponent && (
                <PresetComponent
                  submitId=***REMOVED***submitId***REMOVED***
                  setSubmitId=***REMOVED***setSubmitId***REMOVED***
                />
              )***REMOVED***
            </div>
            <div className="col-4 form-group mb-0">
              <div className="text-right">
                <IconButton
                  label="Set filters"
                  iconName="check"
                  marginClasses="me-3"
                  iconMarginClasses="me-2"
                  submit
                />
                <IconButton
                  label="Reset all filters"
                  iconName="undo"
                  colorType="secondary"
                  iconMarginClasses="me-2"
                  onClick=***REMOVED***reset***REMOVED***
                  reset
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </FilterDispatch.Provider>
  )
***REMOVED***

export default FilterForm
