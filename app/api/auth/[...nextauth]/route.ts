import NextAuth from "next-auth"
import authOptions from "@/app/api/auth/authOptions"

// Initialize NextAuth from imported options
const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }
