import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { oAuthProxy } from 'better-auth/plugins'
import db from '#infrastructure/db.js'
import { sendEmail } from '#infrastructure/services/email.js'

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
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url} If you don’t use this link within 1 hours, it will expire.`
      })
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url}`
      })
    },
    autoSignInAfterVerification: true
  }
})
