import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllLocations } from '../services/api.js'

export default function Home() {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAllLocations().then(setLocations).catch(e => setError(e.message))
  }, [])

  return (
    <section>
      <h1 className="heading">Pick a venue on the map</h1>
      {error && <p className="msg">Could not load locations: {error}</p>}
      <div className="map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="map-lines">
          <path d="M0 30 Q30 45 50 30 T100 45" /><path d="M20 100 Q35 60 60 55 T100 70" />
          <path d="M50 0 L45 100" /><path d="M0 75 L100 20" />
        </svg>
        {locations.map(l => (
          <button key={l.id} className="pin" style={{ left: `${l.x}%`, top: `${l.y}%` }}
            onClick={() => navigate(`/locations/${l.id}`)} aria-label={l.name}>
            <span className="dot" />
            <span className="label">{l.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
