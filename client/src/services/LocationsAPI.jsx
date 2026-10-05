import { get } from './request.js'

export const getAllLocations = () => get('/locations')
export const getLocationById = id => get(`/locations/${id}`)
