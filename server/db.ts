
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MOGO_URL!; // Replace with your MongoDB URI
const client = new MongoClient(uri);


let dbConnection: any;

export async function connectToDatabase() {
  if (!dbConnection) {
    await client.connect();
    console.log("db connected")
    dbConnection = client.db('share_gram'); // Replace with your database name
  }
  console.log("db already connected")
  return dbConnection;
}
