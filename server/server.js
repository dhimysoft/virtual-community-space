import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const app = express()
app.use(cors())

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1>Virtual Community Space API</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
