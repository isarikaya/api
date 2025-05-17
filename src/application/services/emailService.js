export default function emailService(service) {
  return {
    sendEmail: (to, subject, text) => service.sendEmail(to, subject, text)
  }
}
