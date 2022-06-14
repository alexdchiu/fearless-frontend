import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Nav from './nav.js'
import AttendeesList from './AttendeesList.js';
import LocationForm from './LocationForm.js';
import ConferenceForm from './ConferenceForm.js';
import AttendConferenceForm from './AttendConferenceForm'
import PresentationForm from './PresentationForm'
import MainPage from './MainPage.js';


import React from 'react'

function App(props) {
  if (props.attendees === undefined) {
    return null
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/locations/new" element={<LocationForm />} />
        <Route path="/conferences/new" element={<ConferenceForm />} />
        <Route path="/presentations/new" element={<PresentationForm />} />
        <Route path="/attendees" element={<AttendeesList attendees={props.attendees} />} />
        <Route path="/attendees/new" element={<AttendConferenceForm />} />
      </Routes>
    </BrowserRouter>
      // <div className="container">
      //   <AttendConferenceForm />
      //   {/* <ConferenceForm /> */}
      //   {/* <LocationForm /> */}
      //   {/* <AttendeesList attendees={props.attendees}/> */}
      // </div>
  );
}

export default App;
