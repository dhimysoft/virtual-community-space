import { get } from './request.js'

export const getAllEvents = () => get('/events')
export const getEventsByLocation = locationId => get(`/locations/${locationId}/events`)
