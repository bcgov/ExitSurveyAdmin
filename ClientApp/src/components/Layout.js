import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Container ***REMOVED*** from 'reactstrap';
import ***REMOVED*** NavMenu ***REMOVED*** from './NavMenu';

export class Layout extends Component ***REMOVED***
  static displayName = Layout.name;

  render () ***REMOVED***
    return (
      <div>
        <NavMenu />
        <Container>
          ***REMOVED***this.props.children***REMOVED***
        </Container>
      </div>
    );
***REMOVED***
***REMOVED***
