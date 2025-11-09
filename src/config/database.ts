import 'dotenv/config';
import { MongoClient } from 'mongodb';

let mongoClient: MongoClient | null = null;
let isConnected = false;

function getMongoClient(): MongoClient {
  if (!mongoClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    mongoClient = new MongoClient(uri);
  }
  return mongoClient;
}

export { getMongoClient as mongoClient };

export async function getDb() {
  const client = getMongoClient();
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  const dbName = process.env.DATABASE;
  if (!dbName) {
    throw new Error('DATABASE environment variable is not set');
  }
  return client.db(dbName);
}
