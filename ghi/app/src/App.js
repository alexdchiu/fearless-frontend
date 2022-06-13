import Nav from './nav.js'
import AttendeesList from './AttendeesList.js';
import LocationForm from './LocationForm.js';

import React from 'react'

function App(props) {
  if (props.attendees === undefined) {
    return null
  }
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees}/> */}
      </div>
    </React.Fragment>
  );
}

export default App;
