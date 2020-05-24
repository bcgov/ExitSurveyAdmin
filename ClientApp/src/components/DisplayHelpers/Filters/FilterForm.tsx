import React from 'react'

import IconButton from '../Interface/Buttons/IconButton'
import { IFilterField, employeeFilterFields } from './FilterTypes'
import TextFilterInput from './TextFilterInput'

interface IProps {
  addFilters: (filters: IFilterField[]) => void
  resetFilters: () => void
}

type FilterMap = { [key: string]: IFilterField }

const FilterForm = (props: IProps): JSX.Element => {
  const [filterMap, setFilterMap] = React.useState<FilterMap>({})

  const formRef = React.useRef<HTMLFormElement>(null)

  const submitFilters = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    props.addFilters(Object.values(filterMap))
    setFilterMap({})
    formRef.current?.reset()
  }

  const setFilter = React.useCallback(
    (filterField: IFilterField) => {
      const filterMapClone = { ...filterMap }
      filterMapClone[filterField.fieldName] = filterField
      setFilterMap(filterMapClone)
    },
    [filterMap]
  )

  const reset = React.useCallback((): void => {
    setFilterMap({})
    props.resetFilters()
  }, [filterMap])

  const inputs = employeeFilterFields.map(
    (field): JSX.Element => {
      let filterComponent
      switch (field.type) {
        // case 'date':
        //   filterComponent = <Da />
        //   break
        case 'string':
        default:
          filterComponent = (
            <TextFilterInput
              filterField={field as IFilterField}
              setFilter={setFilter}
            />
          )
      }
      return (
        <div key={field.fieldName} className="col-2">
          {filterComponent}
        </div>
      )
    }
  )

  return (
    <div className="FilterForm">
      <form onSubmit={submitFilters} ref={formRef}>
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