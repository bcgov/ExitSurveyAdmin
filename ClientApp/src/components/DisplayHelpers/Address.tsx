import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'

interface IProps ***REMOVED***
  employee: Employee
***REMOVED***

class LabelledText extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const e = this.props.employee
    return (
      <div className="Address">
        ***REMOVED***e.address1***REMOVED***
        <br />
        ***REMOVED***e.address2 ? (
          <React.Fragment>
            ***REMOVED***e.address2***REMOVED***
            <br />
          </React.Fragment>
        ) : (
          <React.Fragment />
        )***REMOVED***
        ***REMOVED***e.addressCity***REMOVED***, ***REMOVED***e.addressProvince***REMOVED***&nbsp;&nbsp;
        ***REMOVED***e.addressPostCode***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***

export default LabelledText
