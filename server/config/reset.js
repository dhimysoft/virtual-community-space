import { pool } from './database.js'

const locations = [
  { name: 'The Echo Lounge', neighborhood: 'Old Town', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', description: 'A cozy basement venue with legendary acoustics and a no-phones-on-stage policy.', x: 22, y: 38 },
  { name: 'Skyline Rooftop', neighborhood: 'Downtown', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', description: 'Open-air sets with the whole city lit up behind the stage.', x: 50, y: 18 },
  { name: 'Warehouse 9', neighborhood: 'Arts District', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', description: 'A converted shipping warehouse hosting late-night electronic and experimental shows.', x: 76, y: 52 },
  { name: 'Riverside Amphitheater', neighborhood: 'Harbor Park', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', description: 'A 2,000-seat outdoor amphitheater on the water for big summer-feel nights.', x: 40, y: 74 }
]

// [location index, title, description, timestamp]
const events = [
  [0, 'Open Mic Night', 'Sign up at the door and play three songs.', '2026-09-18 20:00'],
  [0, 'Jazz & Vinyl Session', 'Live quartet between DJ vinyl sets.', '2026-11-06 19:30'],
  [0, 'Indie Showcase', 'Five up-and-coming local bands, one night.', '2026-12-12 20:00'],
  [1, 'Sunset Acoustic', 'Golden-hour acoustic sets with rooftop cocktails.', '2026-09-26 18:00'],
  [1, 'Skyline Salsa Night', 'Free lesson at 7, live band at 8.', '2026-11-14 19:00'],
  [1, 'New Year Countdown', 'Ring in the new year above the city.', '2026-12-31 21:00'],
  [2, 'Bass Bunker', 'Drum & bass until sunrise.', '2026-09-12 23:00'],
  [2, 'Synth Swap Meet', 'Trade gear, then jam with whatever you bought.', '2026-10-24 14:00'],
  [2, 'Ambient Experiments', 'Immersive sound installation with live visuals.', '2026-11-28 21:00'],
  [3, 'Harbor Lights Festival', 'Three stages, twelve acts, one very big night.', '2026-10-17 17:00'],
  [3, 'Symphony by the Water', 'The city orchestra plays film scores outdoors.', '2026-11-21 18:30'],
  [3, 'Winter Warm-Up Concert', 'Hot cocoa and a headline set to kick off winter.', '2026-12-05 19:00']
]

async function reset() {
  await pool.query('CREATE SCHEMA IF NOT EXISTS vcs')
  await pool.query('DROP TABLE IF EXISTS events; DROP TABLE IF EXISTS locations;')
  await pool.query(`
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      neighborhood VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL
    );
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      event_date TIMESTAMPTZ NOT NULL
    );
  `)
  const ids = []
  for (const l of locations) {
    const { rows } = await pool.query(
      'INSERT INTO locations (name, neighborhood, image, description, x, y) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
      [l.name, l.neighborhood, l.image, l.description, l.x, l.y]
    )
    ids.push(rows[0].id)
  }
  for (const [li, title, description, date] of events) {
    await pool.query(
      'INSERT INTO events (location_id, title, description, event_date) VALUES ($1,$2,$3,$4)',
      [ids[li], title, description, date + ' America/New_York']
    )
  }
  console.log('Database reset: locations and events seeded')
  await pool.end()
}

reset().catch(err => { console.error(err); process.exit(1) })
