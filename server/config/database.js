import './dotenv.js'
import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  // Render requires SSL; set PGSSL=false to use a local Postgres
  ssl: process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false }
}

export const pool = new pg.Pool(config)
