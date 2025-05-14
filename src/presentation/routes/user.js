import userController from '#presentation/controllers/userController.js'
import userRepository from '#application/repositories/userRepository.js'
import dbUserRepository from '#infrastructure/repositories/dbUserRepository.js'
export default function userRouter(express) {
  const router = express.Router()

  const controller = userController(
    userRepository,
    dbUserRepository,
  )
  router.route('/me').get(controller.getMe)
  return router
}
