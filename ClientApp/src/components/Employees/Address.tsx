import React from 'react'

import { Employee } from '../../types/Employee'

interface IProps {
  employee: Employee
  showPreferred?: boolean
}

const Address = ({ employee: e, showPreferred }: IProps): JSX.Element => {
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
      {address1}
      <br />
      {address2 ? (
        <React.Fragment>
          {address2}
          <br />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
      {addressCity}, {addressProvince}&nbsp;&nbsp;
      {addressPostCode}
    </div>
  )
}

export default Address
