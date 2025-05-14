import authServiceImpl from '#infrastructure/services/auth.js'
import authServiceInterface from '#application/services/authService.js'

export default function earlyRoutes(app) {
  const authService = authServiceInterface(authServiceImpl())
  app.all('/api/auth/{*any}', authService.getAuthHandler())
} 