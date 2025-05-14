import db from '#infrastructure/db.js'

export default function userRepository() {
  return {
    async findById(id) {
      const user = await db.user.findUnique({
        where: { id }
      })
      return user
    },
  }
}
