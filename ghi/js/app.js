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


function placeholderCard() {
  return `
    <div class="card" id="placeholder" aria-hidden="true">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-4"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span
        <span class="placeholder col-4"></span
        <span class="placeholder col-4"></span
        <span class="placeholder col-6"></span
        <span class="placeholder col-8"></span
      </p>
      <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-4" aria-hidden="true"></a>
    </div>
  </div>
  <br>
  `
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const container = document.querySelector(`.container`)
      container.innerHTML = `
      <div class="alert alert-warning d-flex align-items>
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-hidden></svg>
      <div>API loaded but did not process. Check console for error. </div>
      </div>
      `
    } else {
      const data = await response.json();
      let i = 0
      for (let conference of data.conferences) {
        i += 1 
        const column = document.querySelector(`#col${i}`)
        column.innerHTML += placeholderCard()

        let placeholder = document.getElementById(`placeholder`)
        // console.log('placeholder', placeholder)

        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        // console.log(detailResponse)

        if (detailResponse.ok) {
          const details = await detailResponse.json();
          // console.log(details.conference)
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const location = details.conference.location.name
          const start = new Date(details.conference.starts).toDateString()
          const end = new Date(details.conference.ends).toDateString()
          const html = createCard(name, description, pictureUrl, start, end, location);
          const row = document.querySelector(`.row`)
          placeholder.remove()
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