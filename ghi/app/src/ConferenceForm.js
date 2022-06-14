import React from 'react'

let today = new Date()
let formattedDate = today.toISOString().split('T')[0]

class ConferenceForm extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      starts: formattedDate,
      ends: formattedDate,
      description: '',
      maxPresentations: '',
      maxAttendees: '',
      locations: [],
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleStartsChange = this.handleStartsChange.bind(this)
    this.handleEndsChange = this.handleEndsChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this)
    this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state};
    data.max_presentations = data.maxPresentations
    data.max_attendees = data.maxAttendees
    delete data.maxPresentations
    delete data.maxAttendees
    // console.log("data", data)

    const locationUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      // formTag.reset();
      // const newConference = await response.json();
      // console.log("conference", newConference)

      const cleared = {
        name: '',
        starts: '',
        ends: '',
        description: '',
        maxPresentations: '',
        maxAttendees: '',
        location: '',
      }
      this.setState(cleared)
    }
  }

  handleNameChange(event) {
    const value = event.target.value
    this.setState({name:value})
  }

  handleStartsChange(event) {
    const value = event.target.value
    this.setState({starts:value})
  }

  handleEndsChange(event) {
    const value = event.target.value
    this.setState({ends:value})
  }

  handleDescriptionChange(event) {
    const value = event.target.value
    this.setState({description:value})
  }

  handleMaxPresentationsChange(event) {
    const value = event.target.value
    this.setState({maxPresentations:value})
  }

  handleMaxAttendeesChange(event) {
    const value = event.target.value
    this.setState({maxAttendees:value})
  }

  handleLocationChange(event) {
    const value = event.target.value
    this.setState({location:value})
  }

  async componentDidMount () {
    const url = 'http://localhost:8000/api/locations/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({locations:data.locations})
      // const selectTag = document.getElementById("location")
      // for (let location of data.locations) {
      //   const option = document.createElement('option')
      //   option.value = location.id
      //   option.innerHTML = location.name
      //   selectTag.appendChild(option)
      // }
    }
  }
    
  
  render () {
    return (
      <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new conference</h1>
              <form onSubmit={this.handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleStartsChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" value={this.state.starts} />
                  <label htmlFor="starts">Starts</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleEndsChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" value={this.state.ends} />
                  <label htmlFor="ends">Ends</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea onChange={this.handleDescriptionChange} className="form-control" required id="description" name="description" rows="3" value={this.state.description}></textarea>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleMaxPresentationsChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" value={this.state.maxPresentations} />
                  <label htmlFor="max_presentations">Maximum presentations</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleMaxAttendeesChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" value={this.state.maxAttendees} />
                  <label htmlFor="max_attendees">Maximum attendees</label>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleLocationChange} required id="location" name="location" className="form-select"  value={this.state.location} >
                    <option value="">Choose a location</option>
                    {this.state.locations.map(location=> {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default ConferenceForm