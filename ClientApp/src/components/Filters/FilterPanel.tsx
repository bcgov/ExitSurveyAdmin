import React from 'react'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'

import ***REMOVED*** IFilter ***REMOVED*** from './FilterClasses/FilterTypes'
import ***REMOVED*** IPresetProps ***REMOVED*** from './Presets/IPresetProps'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from './MasterFilterHandler'
import ActiveFilters from './ActiveFilters/ActiveFilters'
import ExpandPanel from './FilterPanelExpandButton'
import FilterForm from './FilterForm'
import HidePanel from './FilterPanelHideButton'

import './FilterPanel.scss'

interface IProps extends RouteComponentProps ***REMOVED***
  modelName: string
  filterableFields: IFilter[]
  presetComponent?: React.FC<IPresetProps>
***REMOVED***

const removeIfExists = (arr: IFilter[], candidate: IFilter): void => ***REMOVED***
  const index = arr.findIndex(f => f.encode() === candidate.encode())
  if (index > -1) arr.splice(index, 1)
***REMOVED***

const removeIfRequired = (arr: IFilter[], candidate: IFilter): void => ***REMOVED***
  if (candidate.mustReplace) ***REMOVED***
    removeIfExists(arr, candidate)
***REMOVED***
***REMOVED***

const FilterPanel = (props: IProps): JSX.Element => ***REMOVED***
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilter[]>(() =>
    MasterFilterHandler.decodeFromQueryString(
      props.filterableFields,
      props.location.search
    )
  )

  const addFilters = React.useCallback(
    (filtersToAdd: IFilter[]): void => ***REMOVED***
      const filtersClone = [...filters]

      filtersToAdd.forEach(newFilter => ***REMOVED***
        // If a new filter exists in the existing array, and this is a replace
        // filter, remove it
        removeIfRequired(filtersClone, newFilter)
        filtersClone.push(newFilter) // Then push the new filter
    ***REMOVED***)
      setFilters(filtersClone)
  ***REMOVED***
    [filters]
  )

  const removeFilter = React.useCallback(
    (filter: IFilter): void => ***REMOVED***
      const filtersClone = [...filters]
      removeIfExists(filtersClone, filter)
      setFilters(filtersClone)
  ***REMOVED***
    [filters]
  )

  const toggleExpanded = React.useCallback(() => ***REMOVED***
    setExpanded(!expanded)
***REMOVED*** [expanded])

  const resetFilters = React.useCallback((): void => ***REMOVED***
    setFilters([])
***REMOVED*** [])

  React.useEffect(() => ***REMOVED***
    props.history.push(***REMOVED*** search: MasterFilterHandler.encodeAll(filters) ***REMOVED***)
***REMOVED*** [filters, props.history])

  const expandedHeight = expanded ? '400px' : '0px'
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h2 className="mb-0">
                <i className="fas fa-filter mr-2"></i>Filter ***REMOVED***props.modelName***REMOVED***
              </h2>
            </div>
            <div>
              <ActiveFilters filters=***REMOVED***filters***REMOVED*** removeFilter=***REMOVED***removeFilter***REMOVED*** />
            </div>
            <div className="ml-auto">
              ***REMOVED***expanded && <ExpandPanel toggleExpanded=***REMOVED***toggleExpanded***REMOVED*** />***REMOVED***
              ***REMOVED***!expanded && <HidePanel toggleExpanded=***REMOVED***toggleExpanded***REMOVED*** />***REMOVED***
            </div>
          </div>
        </div>
      </div>
      <div
        className=***REMOVED***`FilterPanelBody row $***REMOVED***expandedClass***REMOVED***`***REMOVED***
        style=***REMOVED******REMOVED***
          maxHeight: expandedHeight,
          boxSizing: 'border-box'
      ***REMOVED******REMOVED***
      >
        <div className="col py-3">
          <FilterForm
            filterableFields=***REMOVED***props.filterableFields***REMOVED***
            addFilters=***REMOVED***addFilters***REMOVED***
            resetFilters=***REMOVED***resetFilters***REMOVED***
            presetComponent=***REMOVED***props.presetComponent***REMOVED***
          />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default withRouter(FilterPanel)
