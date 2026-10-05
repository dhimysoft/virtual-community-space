import { useEffect, useState } from 'react'
import { getAllEvents, getAllLocations } from '../services/api.js'
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
      <label className="filter">Filter by location:{' '}
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All locations</option>
          {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </label>
      {error && <p className="msg">{error}</p>}
      <div className="grid">{shown.map(e => <EventCard key={e.id} event={e} showLocation />)}</div>
    </section>
  )
}
