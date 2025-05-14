import { fromNodeHeaders, toNodeHandler } from 'better-auth/node'
import { auth } from '#infrastructure/better_auth.js'

export default function authServiceImpl() {
  return {
    getSession: async (headers) => {
      return await auth.api.getSession({
        headers: fromNodeHeaders(headers)
      })
    },
    requireAuth: async (headers) => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(headers)
      })
      return session
    },
    getAuthHandler: () => {
      return toNodeHandler(auth)
    }
  }
}
