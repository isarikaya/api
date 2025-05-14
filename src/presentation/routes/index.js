import userRouter from './user.js'

export default function routes(app, express) {
  app.get('/api/v1/ping', (req, res) => res.send('pong 🏓'))
  app.use('/api/v1/user', userRouter(express))
}
