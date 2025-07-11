
import { MongoClient } from 'mongodb';
import { config } from './config';
const client = new MongoClient(config.mongoUrl);

let dbConnection: any;

export async function connectToDatabase() {
  if (!dbConnection) {
    await client.connect();
    console.log("db connected");
    dbConnection = client.db('share_gram');
  } else {
    console.log("db already connected");
  }
  return dbConnection;
}
