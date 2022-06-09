// Get the cookie out of the cookie store

const payloadCookie = await cookieStore.get('jwt_access_payload')  // FINISH THIS
if (payloadCookie) {
  // console.log(payloadCookie.value)
  // The cookie value is a JSON-formatted string, so parse it
  const encodedPayload = payloadCookie.value;
  // console.log(encodedPayload)

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(encodedPayload) // FINISH THIS
  // console.log(decodedPayload)

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload)// FINISH THIS

  // Print the payload
  console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  const perms = payload.user.perms
  console.log(perms)
  if (perms.includes("events.add_conference")) {
    const conferenceTag = document.getElementById(`new-conference-link`)
    conferenceTag.classList.remove("d-none")
  }


  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (perms.includes("events.add_location")) {
    const locationTag = document.getElementById(`new-location-link`)
    locationTag.classList.remove("d-none")
  }

  if (perms.includes("presentations.add_presentation")) {
    const presentationTag = document.getElementById(`new-presentation-link`)
    presentationTag.classList.remove("d-none")
  }
}