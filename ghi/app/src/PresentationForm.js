import React from 'react'

class PresentationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      presenterName: '',
      presenterEmail: '',
      companyName: '',
      title: '',
      synopsis: '',
      conferences: [],
    };
    this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this)
    this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this)
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this)
    this.handleConferenceChange = this.handleConferenceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state};
    data.presenter_name = data.presenterName
    data.presenter_email = data.presenterEmail
    data.company_name = data.companyName
    delete data.presenterName
    delete data.presenterEmail
    delete data.companyName
    delete data.conferences
    // console.log("data", data)
    const confId = data.conference

    const locationUrl = `http://localhost:8000/api/conferences/${confId}/presentations/`
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {

      const cleared = {
        presenterName: '',
        presenterEmail: '',
        companyName: '',
        title: '',
        synopsis: '',
        conference: '',
      }
      this.setState(cleared)
    }
  }

  handlePresenterNameChange(event) {
    const value = event.target.value
    this.setState({presenterName:value})
  }

  handlePresenterEmailChange(event) {
    const value = event.target.value
    this.setState({presenterEmail:value})
  }

  handleCompanyNameChange(event) {
    const value = event.target.value
    this.setState({companyName:value})
  }

  handleTitleChange(event) {
    const value = event.target.value
    this.setState({title:value})
  }

  handleSynopsisChange(event) {
    const value = event.target.value
    this.setState({synopsis:value})
  }

  handleConferenceChange(event) {
    const value = event.target.value
    this.setState({conference:value})
  }

  async componentDidMount () {
    const url = 'http://localhost:8000/api/conferences/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      this.setState({conferences:data.conferences})
      // const selectTag = document.getElementById("conference")
      // for (let conference of data.conferences) {
      //   const option = document.createElement('option')
      //   option.value = conference.id
      //   option.innerHTML = conference.name
      //   selectTag.appendChild(option)
    }
    }
  
  
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={this.handlePresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" value={this.state.presenterName} />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePresenterEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" value={this.state.presenterEmail} />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleCompanyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" value={this.state.companyName} />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" value={this.state.title} />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={this.handleSynopsisChange} className="form-control" required id="synopsis" name="synopsis" rows="3" value={this.state.synopsis}></textarea>
              </div>
              <div className="mb-3">
                <select onChange={this.handleConferenceChange} required id="conference" name="conference" className="form-select" value={this.state.conference}>
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map(conference=> {
                    return (
                      <option key={conference.id} value={conference.id}>
                        {conference.name}
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
    );
  }
}

export default PresentationForm