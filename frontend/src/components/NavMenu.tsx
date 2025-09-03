import { Link } from 'react-router'
import React, { type JSX } from 'react'

import LoggedInInfo from './Login/LoggedInInfo'

import './NavMenu.scss'

class NavMenu extends React.Component {
  public static readonly displayName = NavMenu.name

  render(): JSX.Element {
    return (
      <nav className="navbar navbar-expand-xl navbar-light bg-light border-bottom mb-4">
        <Link to="/" className="navbar-brand text-primary">
          <i className="fas fa-envelope-open-text me-3"></i>{" "}
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
        <div
          className="collapse navbar-collapse bg-light"
          id="navbarSupportedContent"
        >
          <LoggedInInfo />
          <ul className="navbar-nav ms-auto">
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
            <li className="nav-item"></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavMenu
