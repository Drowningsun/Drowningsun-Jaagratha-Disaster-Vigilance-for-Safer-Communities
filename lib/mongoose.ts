import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables")
}

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

let cached = (global as any)._mongoose as GlobalMongoose
if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null }
}

export async function getDb() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    // MONGODB_URI was validated above, so cast to string for mongoose.connect
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      dbName: process.env.MONGODB_DB || "jaagratha",
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
