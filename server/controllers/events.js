import { pool } from '../config/database.js'

const SELECT = `SELECT e.id, e.title, e.description, e.event_date, e.location_id,
  l.name AS location_name FROM events e JOIN locations l ON l.id = e.location_id`

export const getEvents = async (req, res) => {
  try {
    const { rows } = await pool.query(`${SELECT} ORDER BY e.event_date`)
    res.status(200).json(rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getEventsByLocation = async (req, res) => {
  try {
    const { rows } = await pool.query(`${SELECT} WHERE e.location_id = $1 ORDER BY e.event_date`, [req.params.locationId])
    res.status(200).json(rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}
