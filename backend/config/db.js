// MongoDB connection with serverless caching
import mongoose from 'mongoose';

// Connection cache for serverless environments
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.log('No MONGODB_URI/MONGO_URI provided, skipping database connection');
    return null;
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 5,
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m.connection;
      })
      .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        return null;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;

