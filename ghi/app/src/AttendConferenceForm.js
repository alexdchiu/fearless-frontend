import React from 'react'

class LocationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      conferences: [],
      submission: false,
    };
    this.handleConferenceChange = this.handleConferenceChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.conferences
    delete data.submission
    console.log(data)

    const attendeeUrl = 'http://localhost:8001/api/attendees/'
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(attendeeUrl, fetchConfig);
    if (response.ok) {

      const cleared = {
        conference: '',
        name: '',
        email: '',
        submission: true
      }
      this.setState(cleared)
    }
  }
  
  handleConferenceChange(event) {
    const value = event.target.value
    this.setState({conference:value})
  }  
  
  handleNameChange(event) {
    const value = event.target.value
    this.setState({name:value})
  }

  handleEmailChange(event) {
    const value = event.target.value
    this.setState({email:value})
  }

  async componentDidMount () {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({conferences:data.conferences})
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
    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    let successClasses = "alert alert-success d-none mb-0"
    let formClasses = ""
    if (this.state.submission === true) {
      successClasses = "alert alert-success mb-0"
      formClasses = "d-none"
    }
    // console.log(this.state.conferences)
    if (this.state.conferences.length > 0) {
      spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
      dropdownClasses = 'form-select';
    }
    
    return (
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="./logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={this.handleSubmit} id="create-attendee-form">
                <h1 className="card-title">It's Conference Time!</h1>
                <p className="mb-3">
                  Please choose which conference
                  you'd like to attend.
                </p>
                <div className={spinnerClasses} id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleConferenceChange} name="conference" id="conference" className={dropdownClasses} required value={this.state.conference}>
                    <option value="">Choose a conference</option>
                    {this.state.conferences.map(conference=> {
                    return (
                      <option key={conference.id} value={conference.href}>
                        {conference.name}
                      </option>
                    )
                    })}
                  </select>
                </div>
                <p className="mb-3">
                  Now, tell us about yourself.
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" value={this.state.name} />
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" value={this.state.email} />
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>
              <div className={successClasses} id="success-message">
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LocationForm