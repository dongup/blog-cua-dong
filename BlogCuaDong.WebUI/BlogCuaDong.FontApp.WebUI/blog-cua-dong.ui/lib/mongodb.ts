import mongoose from "mongoose";

declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | null;
}

const cached = global.mongooseConn ?? { conn: null, promise: null };
global.mongooseConn = cached;

export async function connectMongo() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB ?? "blog-cua-dong",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
