import React from 'react'

import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import IconButton from '../Interface/Buttons/IconButton'
import ***REMOVED*** IFilter ***REMOVED*** from '../../Employees/EmployeeListing'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../types/Employee'

interface IProps ***REMOVED***
  addFilters: (filters: IFilter[]) => void
  // removeFilter: (filter: IFilter) => void
  // setFilters: (filters: IFilter[]) => void
  resetFilters: () => void
  filters: IFilter[]
***REMOVED***

// export const useInput = (initialValue: string): FixTypeLater => ***REMOVED***
//   const [value, setValue] = React.useState(initialValue)

//   return ***REMOVED***
//     value,
//     setValue,
//     reset: (): void => setValue(''),
//     bind: ***REMOVED***
//       value,
//       onChange: (event: FixTypeLater): void => ***REMOVED***
//         setValue(event.target.value)
//     ***REMOVED***
//   ***REMOVED***
// ***REMOVED***
// ***REMOVED***

const FilterForm = (props: IProps): JSX.Element => ***REMOVED***
  const [localFilters, setLocalFilters] = React.useState<***REMOVED***
    [key: string]: string
***REMOVED***>(***REMOVED******REMOVED***)

  const submitFilters = (event: React.FormEvent<HTMLFormElement>): void => ***REMOVED***
    event.preventDefault()
    const filters = Object.keys(localFilters).map(key => (***REMOVED***
      id: key,
      value: localFilters[key]
  ***REMOVED***))
    props.addFilters(filters)
    setLocalFilters(***REMOVED******REMOVED***)
***REMOVED***

  const setValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      const newObject = ***REMOVED*** ...localFilters ***REMOVED***
      newObject[event.target.name] = event.target.value
      setLocalFilters(newObject)
  ***REMOVED***
    [localFilters]
  )

  const reset = React.useCallback((): void => ***REMOVED***
    setLocalFilters(***REMOVED******REMOVED***)
    props.resetFilters()
***REMOVED*** [localFilters])

  const fields = ['firstName', 'lastName']

  const inputs = fields.map(
    (key): JSX.Element => (
      <div key=***REMOVED***key***REMOVED*** className="col-2">
        <LabelledInput
          title=***REMOVED***employeeFieldLabels[key]***REMOVED***
          name=***REMOVED***key***REMOVED***
          onChange=***REMOVED***setValue***REMOVED***
        />
      </div>
    )
  )

  return (
    <div className="FilterForm">
      <form onSubmit=***REMOVED***submitFilters***REMOVED***>
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
