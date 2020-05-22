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

  return (
    <div className="FilterForm">
      <form onSubmit=***REMOVED***submitFilters***REMOVED***>
        <div className="row">
          <div className="col">
            <LabelledInput
              title="First name"
              placeholder="First name"
              name="firstName"
              onChange=***REMOVED***setValue***REMOVED***
            />
            <LabelledItem>
              <TreatmentSelect />
            </LabelledItem>
          </div>
          <div className="col">
            <LabelledItem>
              <StudyDesignSelect />
            </LabelledItem>
            <LabelledItem>
              <NHLSubtypeSelect />
            </LabelledItem>
          </div>
          <div className="col">
            ***REMOVED***/* <div className="LabelledItem">
              <label style=***REMOVED******REMOVED*** lineHeight: '100%' ***REMOVED******REMOVED***>Publication between</label>
            </div> */***REMOVED***
            <div className="row">
              <div className="col">
                ***REMOVED***/* <LabelledInput
                  title="Eff. date from"
                  placeholder="2020-04-01"
                /> */***REMOVED***
              </div>
              <div className="col">
                ***REMOVED***/* <LabelledInput title="Eff. date to" placeholder="2020-04-30" /> */***REMOVED***
              </div>
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
                    onClick=***REMOVED***props.resetFilters***REMOVED***
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      ***REMOVED***/* <hr className="mt-0" /> */***REMOVED***
    </div>
  )
***REMOVED***

export default FilterForm
