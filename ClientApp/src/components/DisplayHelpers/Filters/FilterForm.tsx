/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, ***REMOVED*** useMemo ***REMOVED*** from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import ***REMOVED***
  FilterType,
  IFilter,
  filterableFields
***REMOVED*** from './FilterClasses/FilterTypes'
import TextFilterInput from './Inputs/TextFilterInput'
import DateFilterInput from './Inputs/DateFilterInput'
import EnumFilterInput from './Inputs/EnumFilterInput'
import moment from 'moment'
import DateFilter from './FilterClasses/DateFilter'
import EnumFilter from './FilterClasses/EnumFilter'
import TextFilter from './FilterClasses/TextFilter'

interface IProps ***REMOVED***
  addFilters: (filters: IFilter[]) => void
  resetFilters: () => void
***REMOVED***

export type FilterMapAction = ***REMOVED***
  type: 'setFilter' | 'reset'
  filter?: IFilter
***REMOVED***

type FilterMap = ***REMOVED*** [key: string]: IFilter ***REMOVED***

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

const FilterForm = (***REMOVED*** addFilters, resetFilters ***REMOVED***: IProps): JSX.Element => ***REMOVED***
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
***REMOVED*** [submitId])

  const setActiveUsers = React.useCallback((): void => ***REMOVED***
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: new EnumFilter('currentEmployeeStatusCode', [
        'New',
        'SnailMailSent'
      ])
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [submitId])

  const setPreviousMonth = React.useCallback((): void => ***REMOVED***
    const startDate = moment()
      .subtract(1, 'month')
      .date(1)
    const endDate = moment(startDate).add(1, 'month')
    dispatch(***REMOVED***
      type: 'setFilter',
      filter: new DateFilter(
        'effectiveDate',
        startDate.toDate(),
        endDate.toDate()
      )
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [submitId])

  const setPreviousFiscalYear = React.useCallback((): void => ***REMOVED***
    let startDate = moment()
    const currentYearApril = moment()
      .month('April')
      .date(1)

    if (startDate.isBefore(currentYearApril)) ***REMOVED***
      startDate = startDate.subtract(1, 'year')
  ***REMOVED***
    startDate = startDate
      .subtract(1, 'year')
      .month('April')
      .date(1)
    const endDate = moment(startDate).add(1, 'year')

    dispatch(***REMOVED***
      type: 'setFilter',
      filter: new DateFilter(
        'effectiveDate',
        startDate.toDate(),
        endDate.toDate()
      )
  ***REMOVED***)
    setSubmitId(submitId + 1)
***REMOVED*** [submitId])

  const inputs = useMemo(() => ***REMOVED***
    return filterableFields.map(
      (filter): JSX.Element => ***REMOVED***
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
            colWidth = 3
            break
          case FilterType.Enum:
            filterComponent = (
              <EnumFilterInput
                filter=***REMOVED***filter as EnumFilter***REMOVED***
                resetTimestamp=***REMOVED***resetTimestamp***REMOVED***
              />
            )
            colWidth = 3
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
    ***REMOVED***
    )
***REMOVED*** [resetTimestamp])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <div className="FilterForm">
        <form onSubmit=***REMOVED***submitForm***REMOVED*** ref=***REMOVED***formRef***REMOVED***>
          <div className="row">***REMOVED***inputs***REMOVED***</div>
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
                onClick=***REMOVED***setActiveUsers***REMOVED***
              />
              <IconButton
                label="Previous month"
                iconName="check"
                colorType="outline-primary"
                marginClasses="mr-2"
                iconMarginClasses="mr-2"
                buttonClasses="btn-sm"
                onClick=***REMOVED***setPreviousMonth***REMOVED***
              />
              <IconButton
                label="Previous fiscal year"
                iconName="check"
                colorType="outline-primary"
                marginClasses="mr-2"
                iconMarginClasses="mr-2"
                buttonClasses="btn-sm"
                onClick=***REMOVED***setPreviousFiscalYear***REMOVED***
              />
            </div>

            <div className="col-6 form-group LabelledItem">
              ***REMOVED***/* <label>&nbsp;</label> */***REMOVED***
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
                  onClick=***REMOVED***reset***REMOVED***
                  reset
                />
              </div>
            </div>
          </div>
        </form>
        ***REMOVED***/* <hr className="mt-0" /> */***REMOVED***
      </div>
    </FilterDispatch.Provider>
  )
***REMOVED***

export default FilterForm
