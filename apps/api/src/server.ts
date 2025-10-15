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

const app = express()
const uploadDir = join(process.cwd(), FILES_ROUTE)
mkdirSync(uploadDir, { recursive: true })

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())
app.use(limiter)

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(ENDPOINTS.AUTH, authRouter)
app.use(ENDPOINTS.USER, userRouter)
//Ruta para mostrar todos los distritos
app.use('/api/districts', districtRouter)

app.use(errorMiddleware)

export { app }
