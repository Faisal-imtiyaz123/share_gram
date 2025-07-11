
import { MongoClient } from 'mongodb';
import { config } from './config';
const uri = "mongodb+srv://faisal:mnOiXLvIY0whJvIo@sharegram.1joei1k.mongodb.net/share_gram"
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
