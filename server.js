import express from 'express'

import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import materialRoutes from './routes/materialRoutes.js'
import profDetailRoutes from './routes/profDetailRoutes.js'
import cors from 'cors'
dotenv.config()

const app = express()

//database
connectDb()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/user', userRoutes)
app.use('/api/material', materialRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/profDetail', profDetailRoutes)

//server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server is running at ${PORT}`))
