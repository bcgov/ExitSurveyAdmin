import React from 'react'
import ***REMOVED***
  Collapse,
  Container,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler
***REMOVED*** from 'reactstrap'
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
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag=***REMOVED***Link***REMOVED*** to="/">
              Exit Survey Admin
            </NavbarBrand>
            <NavbarToggler onClick=***REMOVED***this.toggleNavbar***REMOVED*** className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen=***REMOVED***!this.state.collapsed***REMOVED***
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/admin-users">
                    Admin users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/employees">
                    Exiting employees
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
***REMOVED***
***REMOVED***
