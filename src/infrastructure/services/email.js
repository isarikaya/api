import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})
export async function sendEmail({ to, subject, text }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
