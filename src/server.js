import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from '#presentation/routes/index.js'
import earlyRoutes from '#presentation/routes/earlyRoutes.js'
import errorHandlingMiddleware from '#presentation/middlewares/errorHandling.js'

const createServer = () => {
  const app = express()
  app.use(helmet())
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    })
  )

  // Register routes that need to be processed before body parsing
  earlyRoutes(app)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('combined'))
  
  routes(app, express)

  app.use(errorHandlingMiddleware)
  
  return app
}

export default createServer 