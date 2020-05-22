import React from 'react'

import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import LabelledItem from '../Interface/LabelledItems/LabelledItem'
import IconButton from '../Interface/Buttons/IconButton'
import StudyDesignSelect from '../Interface/Selects/StudyDesignSelect'
import TreatmentSelect from '../Interface/Selects/TreatmentSelect'
import NHLSubtypeSelect from '../Interface/Selects/NHLSubtypeSelect'
import { IFilter } from '../../Employees/EmployeeListing'
import { FixTypeLater } from '../../../types/FixTypeLater'

interface IProps {
  addFilters: (filters: IFilter[]) => void
  // removeFilter: (filter: IFilter) => void
  // setFilters: (filters: IFilter[]) => void
  resetFilters: () => void
  filters: IFilter[]
}

// export const useInput = (initialValue: string): FixTypeLater => {
//   const [value, setValue] = React.useState(initialValue)

//   return {
//     value,
//     setValue,
//     reset: (): void => setValue(''),
//     bind: {
//       value,
//       onChange: (event: FixTypeLater): void => {
//         setValue(event.target.value)
//       }
//     }
//   }
// }

const FilterForm = (props: IProps): JSX.Element => {
  const [localFilters, setLocalFilters] = React.useState<{
    [key: string]: string
  }>({})

  const submitFilters = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const filters = Object.keys(localFilters).map(key => ({
      id: key,
      value: localFilters[key]
    }))
    console.log('filters', filters)
    props.addFilters(filters)
    setLocalFilters({})
  }

  const setValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObject = Object.assign({}, localFilters)
      newObject[event.target.name] = event.target.value
      console.log('newObject', newObject)
      setLocalFilters(newObject)
    },
    []
  )

  return (
    <div className="FilterForm">
      <form onSubmit={submitFilters}>
        <div className="row">
          <div className="col">
            <LabelledInput
              title="First name"
              placeholder="First name"
              name="firstName"
              onChange={setValue}
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
            {/* <div className="LabelledItem">
              <label style={{ lineHeight: '100%' }}>Publication between</label>
            </div> */}
            <div className="row">
              <div className="col">
                {/* <LabelledInput
                  title="Eff. date from"
                  placeholder="2020-04-01"
                /> */}
              </div>
              <div className="col">
                {/* <LabelledInput title="Eff. date to" placeholder="2020-04-30" /> */}
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
                    onClick={props.resetFilters}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <hr className="mt-0" /> */}
    </div>
  )
}

export default FilterForm
