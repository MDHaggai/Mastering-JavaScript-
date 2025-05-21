import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import mongoose from 'mongoose'
import { userRoutes } from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = new Hono()

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

app.route('/api', userRoutes)

const PORT = 3000
serve({
  fetch: app.fetch,
  port: PORT
}, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
