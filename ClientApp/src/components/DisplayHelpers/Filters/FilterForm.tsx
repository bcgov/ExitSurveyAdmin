import React from 'react'

import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import IconButton from '../Interface/Buttons/IconButton'
import { IFilter } from '../../Employees/EmployeeListing'
import { employeeFieldLabels } from '../../../types/Employee'

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
    props.addFilters(filters)
    setLocalFilters({})
  }

  const setValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObject = { ...localFilters }
      newObject[event.target.name] = event.target.value
      setLocalFilters(newObject)
    },
    [localFilters]
  )

  const reset = React.useCallback((): void => {
    setLocalFilters({})
    props.resetFilters()
  }, [localFilters])

  const fields = ['firstName', 'lastName']

  const inputs = fields.map(
    (key): JSX.Element => (
      <div key={key} className="col-2">
        <LabelledInput
          title={employeeFieldLabels[key]}
          name={key}
          onChange={setValue}
        />
      </div>
    )
  )

  return (
    <div className="FilterForm">
      <form onSubmit={submitFilters}>
        <div className="row">
          {inputs}
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
                onClick={reset}
                reset
              />
            </div>
          </div>
        </div>
      </form>
      {/* <hr className="mt-0" /> */}
    </div>
  )
}

export default FilterForm
