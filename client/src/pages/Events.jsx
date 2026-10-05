import { useEffect, useState } from 'react'
import { getAllEvents } from '../services/EventsAPI.jsx'
import { getAllLocations } from '../services/LocationsAPI.jsx'
import EventCard from './EventCard.jsx'

export default function Events() {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setEvents(await getAllEvents())
        setLocations(await getAllLocations())
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [])

  const shown = filter === 'all' ? events : events.filter(e => String(e.location_id) === filter)

  return (
    <section>
      <h1 className="heading">All events</h1>
      <div className="chips" role="group" aria-label="Filter by location">
        <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>All venues</button>
        {locations.map(l => (
          <button key={l.id} className={`chip ${filter === String(l.id) ? 'on' : ''}`}
            onClick={() => setFilter(String(l.id))}>{l.name}</button>
        ))}
      </div>
      {error && <p className="msg">{error}</p>}
      <div className="grid">{shown.map(e => <EventCard key={e.id} event={e} showLocation />)}</div>
    </section>
  )
}
