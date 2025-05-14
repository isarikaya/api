import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { oAuthProxy } from 'better-auth/plugins'
import db from '#infrastructure/db.js'

export const auth = betterAuth({
  plugins: [oAuthProxy()],
  database: prismaAdapter(db, {
    provider: 'postgresql'
  }),
  trustedOrigins: ['http://localhost:3000'],
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: 'http://localhost:3001/api/auth/callback/google'
    }
  },
})