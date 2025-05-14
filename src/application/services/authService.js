export default function authServiceInterface(service) {
  return {
    getSession: async (headers) => {
      return await service.getSession(headers)
    },
    requireAuth: async (headers) => {
      return await service.requireAuth(headers)
    },
    getAuthHandler: () => {
      return service.getAuthHandler()
    }
  }
} 