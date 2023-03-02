import React from 'react'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'

interface Props ***REMOVED***
  employee: Employee
  showPreferred?: boolean
***REMOVED***

const Address = (***REMOVED*** employee: e, showPreferred ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const address1 = showPreferred ? e.preferredAddress1 : e.address1
  const address2 = showPreferred ? e.preferredAddress2 : e.address2
  const addressCity = showPreferred ? e.preferredAddressCity : e.addressCity
  const addressProvince = showPreferred
    ? e.preferredAddressProvince
    : e.addressProvince
  const addressPostCode = showPreferred
    ? e.preferredAddressPostCode
    : e.addressPostCode

  return (
    <div className="Address">
      ***REMOVED***address1***REMOVED***
      <br />
      ***REMOVED***address2 ? (
        <React.Fragment>
          ***REMOVED***address2***REMOVED***
          <br />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )***REMOVED***
      ***REMOVED***addressCity***REMOVED***, ***REMOVED***addressProvince***REMOVED***&nbsp;&nbsp;
      ***REMOVED***addressPostCode***REMOVED***
    </div>
  )
***REMOVED***

export default Address
