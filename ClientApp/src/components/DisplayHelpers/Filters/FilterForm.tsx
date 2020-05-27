import React, ***REMOVED*** useMemo ***REMOVED*** from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import ***REMOVED*** IFilterField, employeeFilterFields ***REMOVED*** from './FilterTypes'
import TextFilterInput from './TextFilterInput'
import DateFilterInput from './DateFilterInput'
import EnumFilterInput from './EnumFilterInput'
// import moment from 'moment'
// import ***REMOVED*** defaultFormat ***REMOVED*** from './DateFilterInput'

interface IProps ***REMOVED***
  addFilters: (filters: IFilterField[]) => void
  resetFilters: () => void
***REMOVED***

export type FilterMapAction = ***REMOVED***
  type: 'setFilter' | 'reset'
  filterField?: IFilterField
***REMOVED***

type FilterMap = ***REMOVED*** [key: string]: IFilterField ***REMOVED***

function reducer(state: FilterMap, action: FilterMapAction): FilterMap ***REMOVED***
  const ***REMOVED*** type, filterField ***REMOVED*** = action
  const filterMapClone = ***REMOVED*** ...state ***REMOVED***
  switch (type) ***REMOVED***
    case 'setFilter':
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      filterMapClone[filterField!.fieldName] = filterField!
      return filterMapClone
    case 'reset':
      return ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***

export const cloneAndSetValues = (
  filterField: IFilterField,
  values: string[]
): IFilterField => ***REMOVED***
  const clone = Object.assign(***REMOVED******REMOVED***, filterField)
  clone.values = values
  return clone
***REMOVED***

export const FilterDispatch = React.createContext(***REMOVED******REMOVED***)

const FilterForm = (***REMOVED*** addFilters, resetFilters ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const [filterMap, dispatch] = React.useReducer(reducer, ***REMOVED******REMOVED***)
  const [resetTimestamp, setResetTimestamp] = React.useState<number>(0)

  // console.log('RENDERING FILTERFORM...')

  const formRef = React.useRef<HTMLFormElement>(null)

  const submitFilters = React.useCallback(
    (event?: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
      if (event) event.preventDefault()
      console.log('here', filterMap)
      addFilters(Object.values(filterMap))
      dispatch(***REMOVED*** type: 'reset' ***REMOVED***)
      formRef.current?.reset()
      setResetTimestamp(Date.now())
  ***REMOVED***
    [filterMap, addFilters]
  )

  // const setFilter = React.useCallback(
  //   (filterField: IFilterField) => ***REMOVED***
  //     console.log('filterField', filterField)
  //     const filterMapClone = ***REMOVED*** ...filterMap ***REMOVED***
  //     console.log(filterMapClone)
  //     filterMapClone[filterField.fieldName] = filterField
  //     setFilterMap(filterMapClone)
  // ***REMOVED***
  //   [filterMap]
  // )

  React.useEffect((): void => ***REMOVED***
    console.log('Logging', filterMap)
***REMOVED*** [filterMap])

  // const reset = React.useCallback((): void => ***REMOVED***
  //   setFilterMap(***REMOVED******REMOVED***)
  //   resetFilters()
  //   setResetTimestamp(Date.now())
  // ***REMOVED***, [filterMap])

  // const setActiveUsers = React.useCallback((): void => ***REMOVED***
  //   // setFilter(***REMOVED***
  //   //   fieldName: 'effectiveDate',
  //   //   type: 'date',
  //   //   values: ['', moment().format(defaultFormat)]
  //   // ***REMOVED***)
  //   setFilter(***REMOVED***
  //     fieldName: 'firstName',
  //     type: 'string',
  //     values: ['maur']
  // ***REMOVED***)
  //   // submitFilters()
  // ***REMOVED***, [setFilter])

  const inputs = useMemo(() => ***REMOVED***
    console.log('useMemo inputs')
    return employeeFilterFields.map(
      (field): JSX.Element => ***REMOVED***
        let filterComponent
        let colWidth = 2
        switch (field.type) ***REMOVED***
          case 'date':
            filterComponent = <DateFilterInput filterField=***REMOVED***field***REMOVED*** />
            colWidth = 3
            break
          case 'enum':
            filterComponent = (
              <EnumFilterInput
                filterField=***REMOVED***field***REMOVED***
                resetTimestamp=***REMOVED***resetTimestamp***REMOVED***
              />
            )
            colWidth = 3
            break
          case 'string':
          default:
            filterComponent = <TextFilterInput filterField=***REMOVED***field***REMOVED*** />
      ***REMOVED***
        console.log('Mapping item...')
        return (
          <div key=***REMOVED***field.fieldName***REMOVED*** className=***REMOVED***`col-$***REMOVED***colWidth***REMOVED***`***REMOVED***>
            ***REMOVED***filterComponent***REMOVED***
          </div>
        )
    ***REMOVED***
    )
***REMOVED*** [resetTimestamp])

  return (
    <FilterDispatch.Provider value=***REMOVED***dispatch***REMOVED***>
      <div className="FilterForm">
        <form onSubmit=***REMOVED***submitFilters***REMOVED*** ref=***REMOVED***formRef***REMOVED***>
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
                // onClick=***REMOVED***setActiveUsers***REMOVED***
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
                  // onClick=***REMOVED***reset***REMOVED***
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
