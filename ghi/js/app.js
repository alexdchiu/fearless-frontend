function createCard(name, description, pictureUrl, start, end, location) {
  return `
      <div class="card d-grid gap-5 shadow-lg p-3 mb-5 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer mb-2 text-muted"> 
          ${start} - ${end}
        </div>
      </div>
      <br>
  `;
}

// <div class="card shadow p-3 ms-5 bg-body rounded">

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
      throw new Error('Response is not okay')
    } else {
      const data = await response.json();
      console.log(data)
      let i = 0

      for (let conference of data.conferences) {
        i += 1 
        console.log('hello')
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        // console.log(detailResponse)
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details.conference)
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const location = details.conference.location.name
          const start = new Date(details.conference.starts).toDateString()
          const end = new Date(details.conference.ends).toDateString()
          const html = createCard(name, description, pictureUrl, start, end, location);
          const column = document.querySelector(`#col${i}`)
          // console.log(html)
          column.innerHTML += html
          if (i === 3) {
            i = 0
          }
        }
      }

    }
  } catch (e) {
    // Figure out what to do if an error is raised
    console.log(e.name, e.message)
  }

});



// window.addEventListener('DOMContentLoaded', async () => {

//   const url = 'http://localhost:8000/api/conferences/';
  
//   try {
//     const response = await fetch(url);
//     // console.log(response);

//     if (!response.ok) {
//       // figure out what to do when the response is bad
//       alert({
//         "code": 400,
//         "message": "Invalid JSON Response Received"
//       })
//     } else {
//       const data = await response.json()
//       // console.log(data)

//       for (let conference of data.conferences) {}
//       const conference = data.conferences[0]
//       // console.log(conference)
//       const nameTag = document.querySelector('.card-title')
//       nameTag.innerHTML = conference.name

//       const detailUrl = `http://localhost:8000${conference.href}`
//       const detailResponse = await fetch(detailUrl)
//       if (detailResponse.ok) {
//         const details = await detailResponse.json()
//         // console.log(details)
//         // console.log(details.conference.description)
//         const confDescription = details.conference.description
//         const confDescriptTag = document.querySelector('.card-text')
//         confDescriptTag.innerHTML = confDescription

//         const confImageUrl = details.conference.location.picture_url
//         const confImageTag = document.querySelector('.card-img-top')
//         confImageTag.src = confImageUrl
//       }
//     }
//   } catch (e) {
//     // figure out what to do if an error is raised
//     alert(e.name, e.message)
//   }

// });