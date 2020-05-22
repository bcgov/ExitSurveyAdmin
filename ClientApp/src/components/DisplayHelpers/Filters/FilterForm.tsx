import React from 'react'

import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import LabelledItem from '../Interface/LabelledItems/LabelledItem'
import IconButton from '../Interface/Buttons/IconButton'
import StudyDesignSelect from '../Interface/Selects/StudyDesignSelect'
import TreatmentSelect from '../Interface/Selects/TreatmentSelect'
import NHLSubtypeSelect from '../Interface/Selects/NHLSubtypeSelect'
import ***REMOVED*** IFilter ***REMOVED*** from '../../Employees/EmployeeListing'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

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
    console.log('filters', filters)
    props.addFilters(filters)
    setLocalFilters(***REMOVED******REMOVED***)
***REMOVED***

  const setValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
      const newObject = Object.assign(***REMOVED******REMOVED***, localFilters)
      newObject[event.target.name] = event.target.value
      console.log('newObject', newObject)
      setLocalFilters(newObject)
  ***REMOVED***
    []
  )

  const fields = [***REMOVED*** key: 'firstName', title: 'First name' ***REMOVED***]

  const inputs = fields.map(
    (***REMOVED*** key, title ***REMOVED***): JSX.Element => (
      <div key=***REMOVED***key***REMOVED*** className="col-2">
        <LabelledInput title=***REMOVED***title***REMOVED*** name=***REMOVED***key***REMOVED*** onChange=***REMOVED***setValue***REMOVED*** />
      </div>
    )
  )

  return (
    <div className="FilterForm">
      <form onSubmit=***REMOVED***submitFilters***REMOVED***>
        <div className="row">***REMOVED***inputs***REMOVED***</div>
      </form>
      ***REMOVED***/* <hr className="mt-0" /> */***REMOVED***
    </div>
  )
***REMOVED***

export default FilterForm
