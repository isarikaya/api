import { PrismaClient } from './generated/prisma/client.js'

if (!global.prisma) {
  global.prisma = new PrismaClient()
}

export default global.prisma