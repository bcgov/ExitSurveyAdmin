import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import { IFilter } from '../../Employees/EmployeeListing'
import './FilterPanel.scss'
import FAIcon from '../Interface/Icons/FAIcon'
import IconButton from '../Interface/Buttons/IconButton'

interface IProps {
  onChangeCallback: (filters: IFilter[]) => void
}

interface IState {
  expanded: boolean
  filters: IFilter[]
}

export default class FilterPanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      expanded: false,
      filters: []
    }

    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  toggleExpanded(): void {
    this.setState({ expanded: !this.state.expanded })
  }

  public render(): JSX.Element {
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
                <div className="ml-2" style={{ lineHeight: '100%' }}>
                  <small>
                    Showing
                    <br />
                    41 of 118
                  </small>
                </div>
              </div>
              <div>
                <ActiveFilters />
                {/* <p className="text-muted mb-0">
                  <small>
                    Current filters showing <strong>24</strong> of 118 results
                  </small>
                </p> */}
              </div>
              <div className="ml-auto">
                {this.state.expanded && (
                  <IconButton
                    iconType="far"
                    iconName={expandButtonIcon}
                    label={`${expandButtonText} filters`}
                    iconRight
                    iconMarginClasses="ml-2"
                    colorType="secondary"
                    classes="NoOutline NoBackground Faded"
                    iconClasses="fa-lg"
                    onClick={this.toggleExpanded}
                  />
                )}
                {!this.state.expanded && (
                  <IconButton
                    iconType="far"
                    iconName={expandButtonIcon}
                    label={`${expandButtonText} filters`}
                    iconRight
                    iconMarginClasses="ml-2"
                    colorType="secondary"
                    classes="NoOutline NoBackground Faded"
                    iconClasses="fa-lg"
                    onClick={this.toggleExpanded}
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
            <FilterForm />
          </div>
        </div>
      </div>
    )
  }
}
