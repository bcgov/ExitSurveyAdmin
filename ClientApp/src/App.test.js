import React from 'react';
import ReactDOM from 'react-dom';
import ***REMOVED*** MemoryRouter ***REMOVED*** from 'react-router-dom';
import App from './App';

it('renders without crashing', async () => ***REMOVED***
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
***REMOVED***);
