// config.ts
import * as dotenv from "dotenv";

// ✅ Load .env from server/.env using absolute path
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}
export const config = {
  mongoUrl: getEnv("MONGO_URL"),
  jwtSecret: getEnv("SECRET"),
  pusher: {
    appId: getEnv("PUSHER_APP_ID"),
    key: getEnv("PUSHER_KEY"),
    secret: getEnv("PUSHER_SECRET"),
    cluster: getEnv("PUSHER_CLUSTER"),
  },
};
