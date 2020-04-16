import React from 'react'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import './NavMenu.css'

interface IProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  collapsed: boolean
***REMOVED***

export class NavMenu extends React.Component<IProps, IState> ***REMOVED***
  static displayName = NavMenu.name

  constructor(props: IProps) ***REMOVED***
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = ***REMOVED***
      collapsed: true
  ***REMOVED***
***REMOVED***

  toggleNavbar(): void ***REMOVED***
    this.setState(***REMOVED***
      collapsed: !this.state.collapsed
  ***REMOVED***)
***REMOVED***

  render(): JSX.Element ***REMOVED***
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 border-bottom">
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
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
***REMOVED***
***REMOVED***
