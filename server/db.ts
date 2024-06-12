// src/mongoClient.ts
// src/mongoClient.ts
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

let dbConnection: any;

export async function connectToDatabase() {
  if (!dbConnection) {
    await client.connect();
    dbConnection = client.db('share_gram'); // Replace with your database name
  }
  return dbConnection;
}
