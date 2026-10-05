import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LocationEvents from './pages/LocationEvents.jsx'
import Events from './pages/Events.jsx'

export default function App() {
  return (
    <>
      <header className="header">
        <Link to="/" className="title">NEON DISTRICT</Link>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations/:id" element={<LocationEvents />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<p className="msg">Page not found.</p>} />
        </Routes>
      </main>
    </>
  )
}
