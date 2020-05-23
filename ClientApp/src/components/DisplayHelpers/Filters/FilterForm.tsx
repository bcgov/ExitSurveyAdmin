import React from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import ***REMOVED*** IFilterField, employeeFilterFields ***REMOVED*** from './FilterTypes'
import TextFilterInput from './TextFilterInput'

interface IProps ***REMOVED***
  addFilters: (filters: IFilterField[]) => void
  resetFilters: () => void
***REMOVED***

type FilterMap = ***REMOVED*** [key: string]: IFilterField ***REMOVED***

const FilterForm = (props: IProps): JSX.Element => ***REMOVED***
  const [filterMap, setFilterMap] = React.useState<FilterMap>(***REMOVED******REMOVED***)

  const formRef = React.useRef<HTMLFormElement>(null)

  const submitFilters = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    props.addFilters(Object.values(filterMap))
    setFilterMap(***REMOVED******REMOVED***)
    formRef.current?.reset()
***REMOVED***

  const setFilter = React.useCallback(
    (filterField: IFilterField) => ***REMOVED***
      const filterMapClone = ***REMOVED*** ...filterMap ***REMOVED***
      filterMapClone[filterField.fieldName] = filterField
      setFilterMap(filterMapClone)
  ***REMOVED***
    [filterMap]
  )

  const reset = React.useCallback((): void => ***REMOVED***
    setFilterMap(***REMOVED******REMOVED***)
    props.resetFilters()
***REMOVED*** [filterMap])

  const inputs = employeeFilterFields.map(
    (field): JSX.Element => ***REMOVED***
      let filterComponent
      switch (field.type) ***REMOVED***
        // case 'date':
        //   filterComponent = <Da />
        //   break
        case 'string':
        default:
          filterComponent = (
            <TextFilterInput
              filterField=***REMOVED***field as IFilterField***REMOVED***
              setFilter=***REMOVED***setFilter***REMOVED***
            />
          )
    ***REMOVED***
      return (
        <div key=***REMOVED***field.fieldName***REMOVED*** className="col-2">
          ***REMOVED***filterComponent***REMOVED***
        </div>
      )
  ***REMOVED***
  )

  return (
    <div className="FilterForm">
      <form onSubmit=***REMOVED***submitFilters***REMOVED*** ref=***REMOVED***formRef***REMOVED***>
        <div className="row">
          ***REMOVED***inputs***REMOVED***
          <div className="col-12 form-group LabelledItem">
            <label>&nbsp;</label>
            <div className="text-right">
              <IconButton
                label="Add filters"
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
  )
***REMOVED***

export default FilterForm
