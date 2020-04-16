import React from 'react'
import { Link } from 'react-router-dom'
import './NavMenu.css'

interface IProps {}

interface IState {
  collapsed: boolean
}

export class NavMenu extends React.Component<IProps, IState> {
  static displayName = NavMenu.name

  constructor(props: IProps) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar(): void {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render(): JSX.Element {
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
              <Link to="/admin-users" className="nav-link">
                Admin users
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
