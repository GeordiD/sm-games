export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    '/poker',
    '/api/rooms'
  ],
}