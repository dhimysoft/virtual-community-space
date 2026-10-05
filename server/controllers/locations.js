import { pool } from '../config/database.js'

export const getLocations = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY id')
    res.status(200).json(rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getLocationById = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM locations WHERE id = $1', [req.params.locationId])
    if (!rows.length) return res.status(404).json({ error: 'Location not found' })
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}
