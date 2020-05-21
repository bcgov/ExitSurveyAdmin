import React from 'react'
import { Link } from 'react-router-dom'
import './NavMenu.css'

interface IProps {}

interface IState {
  name?: string
}

class NavMenu extends React.Component<IProps, IState> {
  static displayName = NavMenu.name

  render(): JSX.Element {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <Link to="/" className="navbar-brand">
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
              {/* <small>Logged in as {name}</small> */}
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/task-log-entries" className="nav-link">
                Task log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                Exiting employees
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavMenu
