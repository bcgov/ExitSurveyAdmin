import React, { type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { Filter } from './FilterClasses/FilterTypes'
import { PresetProps } from './Presets/PresetProps'
import { MasterFilterHandler } from './MasterFilterHandler'
import ActiveFilters from './ActiveFilters/ActiveFilters'
import ExpandPanel from './FilterPanelExpandButton'
import FilterForm from './FilterForm'
import HidePanel from './FilterPanelHideButton'

import './FilterPanel.scss'

interface Props {
  modelName: string
  filterableFields: Filter[]
  presetComponent?: React.ComponentType<PresetProps>
}

const removeExactMatch = (arr: Filter[], candidate: Filter): void => {
  const index = arr.findIndex((f) => f.encode() === candidate.encode())
  if (index > -1) arr.splice(index, 1)
}

const removeIfExists = (arr: Filter[], candidate: Filter): void => {
  const index = arr.findIndex((f) => f.fieldName === candidate.fieldName)
  if (index > -1) arr.splice(index, 1)
}

const removeIfRequired = (arr: Filter[], candidate: Filter): void => {
  // Remove exact matches
  removeExactMatch(arr, candidate)
  if (candidate.mustReplace) {
    removeIfExists(arr, candidate)
  }
}

const FilterPanel = (props: Props): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<Filter[]>(() =>
    MasterFilterHandler.decodeFromQueryString(
      props.filterableFields,
      location.search
    )
  )

  const addFilters = React.useCallback(
    (filtersToAdd: Filter[]): void => {
      const filtersClone = [...filters]

      filtersToAdd.forEach((newFilter) => {
        // If a new filter exists in the existing array, and this is a replace
        // filter, remove it
        removeIfRequired(filtersClone, newFilter)
        filtersClone.push(newFilter) // Then push the new filter
      })
      setFilters(filtersClone)
    },
    [filters]
  )

  const removeFilter = React.useCallback(
    (filter: Filter): void => {
      const filtersClone = [...filters]
      removeIfExists(filtersClone, filter)
      setFilters(filtersClone)
    },
    [filters]
  )

  const toggleExpanded = React.useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const resetFilters = React.useCallback((): void => {
    setFilters([])
  }, [])

  React.useEffect(() => {
    navigate({ search: MasterFilterHandler.encodeAll(filters) }, { replace: true })
  }, [filters, navigate])

  React.useEffect(() => {
    if (location.search === '') {
      setFilters([])
    }
  }, [location.search])

  const expandedHeight = expanded ? '400px' : '0px'
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <h2 className="mb-0">
                <i className="fas fa-filter me-2"></i>Filter {props.modelName}
              </h2>
            </div>
            <div>
              <ActiveFilters filters={filters} removeFilter={removeFilter} />
            </div>
            <div className="ms-auto">
              {expanded && <ExpandPanel toggleExpanded={toggleExpanded} />}
              {!expanded && <HidePanel toggleExpanded={toggleExpanded} />}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`FilterPanelBody row ${expandedClass}`}
        style={{
          maxHeight: expandedHeight,
          boxSizing: 'border-box',
        }}
      >
        <div className="col py-3">
          <FilterForm
            filterableFields={props.filterableFields}
            addFilters={addFilters}
            resetFilters={resetFilters}
            presetComponent={props.presetComponent}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
