import authServiceImpl from '#infrastructure/services/auth.js'
import authServiceInterface from '#application/services/authService.js'
import { HTTP_STATUS } from '#lib/http_status.js'

export default async function authMiddleware(req, res, next) {
  try {
    const authService = authServiceInterface(authServiceImpl())
    const session = await authService.requireAuth(req.headers)
    req.user = session.user
    req.session = session
    next()
  } catch (error) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }
}
