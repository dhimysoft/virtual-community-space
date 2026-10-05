const API = 'http://localhost:3001/api'

async function get(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText)
  return res.json()
}

export const getAllLocations = () => get('/locations')
export const getLocationById = id => get(`/locations/${id}`)
export const getEventsByLocation = id => get(`/locations/${id}/events`)
export const getAllEvents = () => get('/events')
