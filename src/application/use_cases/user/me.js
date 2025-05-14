export default async function me(headers, authService) {
  const session = await authService.getSession(headers)

  return session
}
