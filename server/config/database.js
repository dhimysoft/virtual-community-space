import './dotenv.js'
import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  // Keep this app's tables in their own schema so they never collide with
  // (or drop) tables from other apps sharing the same database.
  options: '-c search_path=vcs',
  keepAlive: true,
  // Render requires SSL; set PGSSL=false to use a local Postgres
  ssl: process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false }
}

export const pool = new pg.Pool(config)

// Render closes idle connections; without a handler the pool's error event crashes Node.
pool.on('error', err => console.error('Idle database client error:', err.message))
