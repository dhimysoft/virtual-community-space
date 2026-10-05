import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllLocations } from '../services/api.js'

// City blocks laid out between the streets; a few are parks
const XS = [3, 27, 43, 63, 81], WS = [20, 13, 17, 15, 16]
const YS = [3, 23, 39], HS = [14, 12, 10]
const PARKS = new Set(['0-0', '3-0'])
const blocks = YS.flatMap((y, r) => XS.map((x, c) => ({ x, y, w: WS[c], h: HS[r], k: `${c}-${r}` })))
const TONES = ['#e3d7bd', '#dccfb2', '#e8dec7']

function CityMap() {
  return (
    <svg viewBox="0 0 100 62" className="map-art" aria-hidden="true">
      <rect width="100" height="62" fill="#efe6d2" />
      {blocks.map((b, i) => (
        <rect key={b.k} x={b.x} y={b.y} width={b.w} height={b.h} rx={PARKS.has(b.k) ? 1.2 : 0.3}
          fill={PARKS.has(b.k) ? '#c3d9a6' : TONES[i % 3]} />
      ))}
      <g stroke="#fffaf0" strokeWidth="1.8" fill="none">
        {[21, 37].map(y => <path key={y} d={`M0 ${y} H100`} />)}
        {[25, 41, 61, 79].map(x => <path key={x} d={`M${x} 0 V50`} />)}
        <path d="M0 52 L100 6" strokeWidth="1.2" />
      </g>
      <path d="M0 49 C18 43 30 56 52 51 S85 41 100 46 L100 62 L0 62Z" fill="#a9cfe0" />
      <path d="M0 49 C18 43 30 56 52 51 S85 41 100 46" fill="none" stroke="#16130f" strokeWidth=".35" />
      <g fontFamily="DM Sans, sans-serif" fontWeight="700" fill="#8a8170" fontSize="1.7" letterSpacing=".3">
        <text x="4" y="20.2">MAIN ST</text><text x="64" y="36.2">ARTS AVE</text>
        <text x="7" y="9" fill="#5f7d3e">OLD TOWN PARK</text><text x="82" y="9" fill="#5f7d3e">PIER PARK</text>
        <text x="8" y="58.5" fill="#4a7f99" fontSize="2.2" letterSpacing="1">HARBOR</text>
      </g>
    </svg>
  )
}

export default function Home() {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAllLocations().then(setLocations).catch(e => setError(e.message))
  }, [])

  return (
    <section>
      <p className="kicker">Live music guide</p>
      <h1 className="heading">Where are you headed tonight?</h1>
      {error && <p className="msg">Could not load locations: {error}</p>}
      <div className="map">
        <CityMap />
        {locations.map((l, i) => (
          <button key={l.id} className="pin" style={{ left: `${l.x}%`, top: `${l.y}%` }}
            onClick={() => navigate(`/locations/${l.id}`)} aria-label={l.name}>
            <span className="num">{i + 1}</span>
            <span className="label"><b>{l.name}</b><small>{l.neighborhood}</small></span>
          </button>
        ))}
      </div>
      <div className="venues">
        {locations.map((l, i) => (
          <Link key={l.id} to={`/locations/${l.id}`} className="venue">
            <img src={l.image} alt="" loading="lazy" />
            <span className="vnum">{i + 1}</span>
            <h3>{l.name}</h3>
            <p>{l.neighborhood}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
