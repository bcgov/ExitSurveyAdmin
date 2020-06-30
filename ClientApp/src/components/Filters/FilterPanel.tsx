import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import { IFilter } from './FilterClasses/FilterTypes'
import { IPresetProps } from './Presets/IPresetProps'
import { MasterFilterHandler } from './MasterFilterHandler'
import ActiveFilters from './ActiveFilters/ActiveFilters'
import ExpandPanel from './FilterPanelExpandButton'
import FilterForm from './FilterForm'
import HidePanel from './FilterPanelHideButton'

import './FilterPanel.scss'

interface IProps extends RouteComponentProps {
  modelName: string
  filterableFields: IFilter[]
  presetComponent?: React.FC<IPresetProps>
}

const removeExactMatch = (arr: IFilter[], candidate: IFilter): void => {
  const index = arr.findIndex(f => f.encode() === candidate.encode())
  if (index > -1) arr.splice(index, 1)
}

const removeIfExists = (arr: IFilter[], candidate: IFilter): void => {
  const index = arr.findIndex(f => f.fieldName === candidate.fieldName)
  if (index > -1) arr.splice(index, 1)
}

const removeIfRequired = (arr: IFilter[], candidate: IFilter): void => {
  // Remove exact matches
  removeExactMatch(arr, candidate)
  if (candidate.mustReplace) {
    removeIfExists(arr, candidate)
  }
}

const FilterPanel = (props: IProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilter[]>(() =>
    MasterFilterHandler.decodeFromQueryString(
      props.filterableFields,
      props.location.search
    )
  )

  const addFilters = React.useCallback(
    (filtersToAdd: IFilter[]): void => {
      const filtersClone = [...filters]

      filtersToAdd.forEach(newFilter => {
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
    (filter: IFilter): void => {
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
    props.history.push({ search: MasterFilterHandler.encodeAll(filters) })
  }, [filters, props.history])

  React.useEffect(() => {
    if (props.location.search === '') {
      setFilters([])
    }
  }, [props.location.search])

  const expandedHeight = expanded ? '400px' : '0px'
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h2 className="mb-0">
                <i className="fas fa-filter mr-2"></i>Filter {props.modelName}
              </h2>
            </div>
            <div>
              <ActiveFilters filters={filters} removeFilter={removeFilter} />
            </div>
            <div className="ml-auto">
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
          boxSizing: 'border-box'
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

export default withRouter(FilterPanel)
