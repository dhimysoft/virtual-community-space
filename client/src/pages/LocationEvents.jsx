import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocationById, getEventsByLocation } from '../services/api.js'
import EventCard from './EventCard.jsx'

export default function LocationEvents() {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [loc, evs] = await Promise.all([getLocationById(id), getEventsByLocation(id)])
        setLocation(loc)
        setEvents(evs)
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [id])

  if (error) return <p className="msg">{error}</p>
  if (!location) return <p className="msg">Loading…</p>

  return (
    <section>
      <Link to="/" className="back">← Back to map</Link>
      <div className="location">
        <img src={location.image} alt={location.name} />
        <div>
          <h1>{location.name}</h1>
          <p className="where">{location.neighborhood}</p>
          <p>{location.description}</p>
        </div>
      </div>
      <h2>Events</h2>
      {events.length === 0 && <p className="msg">No events here yet.</p>}
      <div className="grid">{events.map(e => <EventCard key={e.id} event={e} />)}</div>
    </section>
  )
}
