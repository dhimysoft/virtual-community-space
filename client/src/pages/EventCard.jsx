import Countdown from './Countdown.jsx'

export default function EventCard({ event, showLocation }) {
  const past = new Date(event.event_date) < new Date()
  return (
    <article className={`event ${past ? 'past' : ''}`}>
      <h3>{event.title}</h3>
      {showLocation && <p className="where">{event.location_name}</p>}
      <p className="when">{new Date(event.event_date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</p>
      <p>{event.description}</p>
      <Countdown date={event.event_date} />
    </article>
  )
}
