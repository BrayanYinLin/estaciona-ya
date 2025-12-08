import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { limiter } from './shared/middlewares/rate-limiter.middleware'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { authRouter } from '@auth/auth.router'
import { errorMiddleware } from '@shared/middlewares/error.middleware'
import swaggerUI from 'swagger-ui-express'
import { swaggerDocs } from '@shared/docs/parse.docs'
import { userRouter } from '@users/user.router'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'
import { FILES_ROUTE } from '@shared/constants/files.route'
import districtRouter from '@locations/routers/district.router'
import { locationRouter } from '@locations/routers/location.router'
import { rentModeRouter } from '@garages/routers/rent_mode.router'
import { garageRouter } from '@garages/routers/garage.router'
import BookingRequestrouter from '@booking_requests/routers/booking-request.router'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { socketManager } from '@shared/sockets/manager'
import { bookingRouter } from '@bookings/booking.router'

const app = express()
const uploadDir = join(process.cwd(), FILES_ROUTE)
mkdirSync(uploadDir, { recursive: true })

const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
socketManager(io)

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())
app.use(limiter)

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(ENDPOINTS.AUTH, authRouter)
app.use(ENDPOINTS.USER, userRouter)
app.use(ENDPOINTS.DISTRICTS, districtRouter)
app.use(ENDPOINTS.LOCATION, locationRouter)
app.use(ENDPOINTS.RENT_MODE, rentModeRouter)
app.use(ENDPOINTS.GARAGES, garageRouter)
app.use(ENDPOINTS.BOOKING_REQUESTS, BookingRequestrouter)
app.use(ENDPOINTS.BOOKING, bookingRouter)

app.use(errorMiddleware)

export { app, server, io }
