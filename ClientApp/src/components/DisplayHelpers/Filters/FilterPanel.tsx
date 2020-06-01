import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import './FilterPanel.scss'
import { IFilterField } from './FilterTypes'
import { RouteComponentProps, withRouter } from 'react-router'
import { MasterFilterHandler } from './MasterFilterHandler'
import ExpandPanel from '../Interface/Buttons/FilterPanelExpandButton'
import HidePanel from '../Interface/Buttons/FilterPanelHideButton'

interface IProps extends RouteComponentProps {}

const removeIfExists = (arr: IFilterField[], candidate: IFilterField): void => {
  const index = arr.findIndex(f => f.fieldName === candidate.fieldName)
  if (index > -1) arr.splice(index, 1)
}

const FilterPanel = (props: IProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilterField[]>(() =>
    MasterFilterHandler.decodeFromQueryString(props.location.search)
  )

  const addFilters = React.useCallback(
    (filtersToAdd: IFilterField[]): void => {
      const filtersClone = [...filters]

      filtersToAdd.forEach(newFilter => {
        // If a new filter exists in the existing array, remove it
        removeIfExists(filtersClone, newFilter)
        filtersClone.push(newFilter) // Then push the new filter
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

  const toggleExpanded = React.useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const resetFilters = React.useCallback((): void => {
    setFilters([])
  }, [])

  React.useEffect(() => {
    props.history.push({ search: MasterFilterHandler.encodeAll(filters) })
  }, [filters, props.history])

  const expandedHeight = expanded ? '400px' : '0px'
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
          <FilterForm addFilters={addFilters} resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(FilterPanel)
