import { useEffect, useState } from 'react'

export default function Countdown({ date }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = new Date(date).getTime() - now
  const abs = Math.abs(diff)
  const d = Math.floor(abs / 86400000)
  const h = Math.floor(abs / 3600000) % 24
  const m = Math.floor(abs / 60000) % 60
  const s = Math.floor(abs / 1000) % 60
  const text = `${d}d ${h}h ${m}m ${s}s`
  return diff < 0
    ? <span className="countdown past">Ended {text} ago</span>
    : <span className="countdown">Starts in {text}</span>
}
