import React from 'react'

import './Home.scss'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div className="Centered row">
        <div className="col-6 offset-3">
          <h1 className="text-primary display-4 my-5">
            <i className="fas fa-envelope-open-text mr-4"></i>Exit Survey Admin
          </h1>
          <h2>Quick filters</h2>
          <ul>
            <li>
              <Link
                to={{
                  pathname: '/employees',
                  search: '&filters=effectiveDate%3C=2020-06-03'
                }}
              >
                Active employees
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
