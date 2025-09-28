import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { limiter } from './shared/middlewares/rate-limiter.middleware'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())
app.use(limiter)

export { app }
