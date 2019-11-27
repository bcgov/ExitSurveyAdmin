import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink ***REMOVED*** from 'reactstrap';
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component ***REMOVED***
  static displayName = NavMenu.name;

  constructor (props) ***REMOVED***
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = ***REMOVED***
      collapsed: true
  ***REMOVED***;
***REMOVED***

  toggleNavbar () ***REMOVED***
    this.setState(***REMOVED***
      collapsed: !this.state.collapsed
  ***REMOVED***);
***REMOVED***

  render () ***REMOVED***
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag=***REMOVED***Link***REMOVED*** to="/">NETReact</NavbarBrand>
            <NavbarToggler onClick=***REMOVED***this.toggleNavbar***REMOVED*** className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen=***REMOVED***!this.state.collapsed***REMOVED*** navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag=***REMOVED***Link***REMOVED*** className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
***REMOVED***
***REMOVED***
