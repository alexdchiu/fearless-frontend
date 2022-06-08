window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';
  
  try {
    const response = await fetch(url);
    // console.log(response);

    if (!response.ok) {
      // figure out what to do when the response is bad
      alert({
        "code": 400,
        "message": "Invalid JSON Response Received"
      })
    } else {
      const data = await response.json()
      // console.log(data)

      const conference = data.conferences[0]
      // console.log(conference)
      const nameTag = document.querySelector('.card-title')
      nameTag.innerHTML = conference.name

      const detailUrl = `http://localhost:8000${conference.href}`
      const detailResponse = await fetch(detailUrl)
      if (detailResponse.ok) {
        const details = await detailResponse.json()
        // console.log(details)
        // console.log(details.conference.description)
        const confDescription = details.conference.description
        const confDescriptTag = document.querySelector('.card-text')
        confDescriptTag.innerHTML = confDescription

        const confImageUrl = details.conference.location.picture_url
        const confImageTag = document.querySelector('.card-img-top')
        confImageTag.src = confImageUrl
      }
    }
    
  } catch (e) {
    // figure out what to do if an error is raised
    alert(e.name, e.message)
  }

});