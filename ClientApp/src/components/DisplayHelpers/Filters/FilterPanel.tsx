import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import ***REMOVED*** IFilter ***REMOVED*** from '../../Employees/EmployeeListing'
import './FilterPanel.scss'
import FAIcon from '../Interface/Icons/FAIcon'
import IconButton from '../Interface/Buttons/IconButton'

interface IProps ***REMOVED***
  onChangeCallback: (filters: IFilter[]) => void
***REMOVED***

interface IState ***REMOVED***
  expanded: boolean
  filters: IFilter[]
***REMOVED***

export default class FilterPanel extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)

    this.state = ***REMOVED***
      expanded: false,
      filters: []
  ***REMOVED***

    this.toggleExpanded = this.toggleExpanded.bind(this)
***REMOVED***

  toggleExpanded(): void ***REMOVED***
    this.setState(***REMOVED*** expanded: !this.state.expanded ***REMOVED***)
***REMOVED***

  public render(): JSX.Element ***REMOVED***
    const expandedHeight = this.state.expanded ? '200px' : '0px'
    const expandButtonText = this.state.expanded ? 'Hide' : 'Expand'
    const expandButtonIcon = this.state.expanded
      ? 'caret-circle-down'
      : 'caret-circle-right'
    const expandedClass = this.state.expanded ? 'Expanded' : ''

    return (
      <div className="FilterPanel">
        <div className="FilterPanelHeader row py-3">
          <div className="col">
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <h2 className="mb-0 text-dark">
                  <i className="far fa-filter mr-2"></i>Filter employees
                </h2>
              </div>
              <div className="mr-3 text-muted px-2 py-1 d-flex align-items-center bg-light border">
                <div>
                  <FAIcon name="eye" type="far" />
                </div>
                <div className="ml-2" style=***REMOVED******REMOVED*** lineHeight: '100%' ***REMOVED******REMOVED***>
                  <small>
                    Showing
                    <br />
                    41 of 118
                  </small>
                </div>
              </div>
              <div>
                <ActiveFilters />
                ***REMOVED***/* <p className="text-muted mb-0">
                  <small>
                    Current filters showing <strong>24</strong> of 118 results
                  </small>
                </p> */***REMOVED***
              </div>
              <div className="ml-auto">
                ***REMOVED***this.state.expanded && (
                  <IconButton
                    iconType="far"
                    iconName=***REMOVED***expandButtonIcon***REMOVED***
                    label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                    iconRight
                    iconMarginClasses="ml-2"
                    colorType="secondary"
                    classes="NoOutline NoBackground Faded"
                    iconClasses="fa-lg"
                    onClick=***REMOVED***this.toggleExpanded***REMOVED***
                  />
                )***REMOVED***
                ***REMOVED***!this.state.expanded && (
                  <IconButton
                    iconType="far"
                    iconName=***REMOVED***expandButtonIcon***REMOVED***
                    label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                    iconRight
                    iconMarginClasses="ml-2"
                    colorType="secondary"
                    classes="NoOutline NoBackground Faded"
                    iconClasses="fa-lg"
                    onClick=***REMOVED***this.toggleExpanded***REMOVED***
                  />
                )***REMOVED***
              </div>
            </div>
          </div>
        </div>
        <div
          className=***REMOVED***`FilterPanelBody row $***REMOVED***expandedClass***REMOVED***`***REMOVED***
          style=***REMOVED******REMOVED***
            maxHeight: expandedHeight,
            overflow: 'hidden',
            boxSizing: 'border-box'
        ***REMOVED******REMOVED***
        >
          <div className="col py-3">
            <FilterForm />
          </div>
        </div>
      </div>
    )
***REMOVED***
***REMOVED***
