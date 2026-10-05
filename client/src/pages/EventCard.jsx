import Countdown from './Countdown.jsx'

export default function EventCard({ event, showLocation }) {
  const d = new Date(event.event_date)
  const past = d < new Date()
  return (
    <article className={`ticket ${past ? 'past' : ''}`}>
      <div className="stub">
        <span className="mon">{d.toLocaleString([], { month: 'short' })}</span>
        <span className="day">{d.getDate()}</span>
        <span className="yr">{d.getFullYear()}</span>
      </div>
      <div className="body">
        {past && <span className="stamp">Past</span>}
        <h3>{event.title}</h3>
        {showLocation && <p className="where">{event.location_name}</p>}
        <p className="time">{d.toLocaleString([], { weekday: 'long', hour: 'numeric', minute: '2-digit' })}</p>
        <p className="desc">{event.description}</p>
        <Countdown date={event.event_date} />
      </div>
    </article>
  )
}
