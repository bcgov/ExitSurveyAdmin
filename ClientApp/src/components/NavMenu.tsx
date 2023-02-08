import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import React from 'react'

import './NavMenu.scss'

class NavMenu extends React.Component ***REMOVED***
  static displayName = NavMenu.name

  render(): JSX.Element ***REMOVED***
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4">
        <Link to="/" className="navbar-brand text-primary">
          <i className="fas fa-envelope-open-text mr-3"></i>
          Exit Survey Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              ***REMOVED***/* <small>Logged in as ***REMOVED***name***REMOVED***</small> */***REMOVED***
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/status" className="nav-link text-primary">
                Health status
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/task-log-entries" className="nav-link text-primary">
                Task log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link text-primary">
                Employee database
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-primary">
                Admin interface
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
***REMOVED***
***REMOVED***

export default NavMenu
