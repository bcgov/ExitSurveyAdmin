import React from 'react'
import IconButton from './IconButton'
import ***REMOVED*** employeeFieldLabels ***REMOVED*** from '../../../../types/Employee'
import ***REMOVED*** IFilter ***REMOVED*** from '../../../Employees/EmployeeListing'

interface IProps ***REMOVED***
  filter: string
  value: string
  removeFilter: (filter: IFilter) => void
***REMOVED***

const ActiveFilterButton = (props: IProps) => ***REMOVED***
  const ***REMOVED*** filter, value ***REMOVED*** = props
  const label = employeeFieldLabels[filter]

  const remove = (): void => ***REMOVED***
    props.removeFilter(***REMOVED*** id: filter, value ***REMOVED***)
***REMOVED***

  return (
    <IconButton
      label=***REMOVED***
        <React.Fragment>
          ***REMOVED***label***REMOVED***: <strong>***REMOVED***value***REMOVED***</strong>
        </React.Fragment>
    ***REMOVED***
      iconName="times"
      marginClasses="mr-1 my-1 mb-0"
      iconMarginClasses="ml-2"
      colorType="primary"
      iconRight
      size="sm"
      onClick=***REMOVED***remove***REMOVED***
    />
  )
***REMOVED***

export default ActiveFilterButton
