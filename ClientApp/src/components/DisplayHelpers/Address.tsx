import React from 'react'
import { Employee } from '../../types/Employee'

interface IProps {
  employee: Employee
}

class LabelledText extends React.Component<IProps> {
  render(): JSX.Element {
    const e = this.props.employee
    return (
      <div className="Address">
        {e.address1}
        <br />
        {e.address2 ? (
          <React.Fragment>
            {e.address2}
            <br />
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
        {e.addressCity}, {e.addressProvince}&nbsp;&nbsp;
        {e.addressPostCode}
      </div>
    )
  }
}

export default LabelledText
