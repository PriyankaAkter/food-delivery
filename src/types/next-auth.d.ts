import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name: string,
        role: string,
        image: string
      }
  interface Session {
    user: User & {
        name: string
        role: string
        image: string
    }
    token: {
        name: string
        role: string
        image: string
    }
}
}