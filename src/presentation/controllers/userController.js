import { HTTP_STATUS } from '#lib/http_status.js'
import me from '#application/use_cases/user/me.js'
import authServiceInterface from '#application/services/authService.js'
import authServiceImpl from '#infrastructure/services/auth.js'
export default function userController(userRepository, userRepositoryImpl) {
  const dbRepository = userRepository(userRepositoryImpl())
  const authService = authServiceInterface(authServiceImpl())

  const getMe = async (req, res, next) => {
    try {
      const result = await me(req.headers, authService)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  return {
    getMe
  }
}
