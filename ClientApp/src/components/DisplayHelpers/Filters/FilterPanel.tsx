import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import './FilterPanel.scss'
import IconButton from '../Interface/Buttons/IconButton'
import { IFilterField } from './FilterTypes'

interface IProps {
  onChangeCallback: (filters: IFilterField[]) => void
}

const removeIfExists = (arr: IFilterField[], candidate: IFilterField): void => {
  const index = arr.findIndex(f => f.fieldName === candidate.fieldName)
  if (index > -1) arr.splice(index, 1)
}

const FilterPanel = (props: IProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilterField[]>([])

  const addFilters = React.useCallback(
    (filtersToAdd: IFilterField[]): void => {
      const filtersClone = [...filters]

      filtersToAdd.forEach(newFilter => {
        // If a new filter exists in the existing array, remove it
        removeIfExists(filtersClone, newFilter)
        // Then push the new filter
        filtersClone.push(newFilter)
      })

      setFilters(filtersClone)
    },
    [filters]
  )

  const removeFilter = React.useCallback(
    (filter: IFilterField): void => {
      const filtersClone = [...filters]
      removeIfExists(filtersClone, filter)
      setFilters(filtersClone)
    },
    [filters]
  )

  const resetFilters = React.useCallback((): void => {
    setFilters([])
  }, [filters])

  React.useEffect(() => props.onChangeCallback(filters), [filters])

  const expandedHeight = expanded ? '200px' : '0px'
  const expandButtonText = expanded ? 'Hide' : 'Expand'
  const expandButtonIcon = `caret-${expanded ? 'down' : 'right'}`
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h2 className="mb-0">
                <i className="fas fa-filter mr-2"></i>Filter employees
              </h2>
            </div>
            <div>
              <ActiveFilters filters={filters} removeFilter={removeFilter} />
            </div>
            <div className="ml-auto">
              {expanded && (
                <IconButton
                  iconType="fas"
                  iconName={expandButtonIcon}
                  label={`${expandButtonText} filters`}
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick={(): void => setExpanded(!expanded)}
                />
              )}
              {!expanded && (
                <IconButton
                  iconType="fas"
                  iconName={expandButtonIcon}
                  label={`${expandButtonText} filters`}
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick={(): void => setExpanded(!expanded)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`FilterPanelBody row ${expandedClass}`}
        style={{
          maxHeight: expandedHeight,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div className="col py-3">
          <FilterForm addFilters={addFilters} resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
