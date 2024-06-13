import * as bcrypt from 'bcrypt'; // Install bcrypt using npm or yarn: npm install bcrypt
import * as jwt from "jsonwebtoken"
import * as crypto from 'crypto'; // For encryption
import * as dotenv from 'dotenv';
import {Response} from "express"
dotenv.config()

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust the number of rounds based on your security needs
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

// export const generateAuthToken = (userId: string, secret: string): string => {
//     const payload = { userId }; // Add additional user information if needed
//     const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiry to 1 hour (adjust as needed)
//     return token;
// };
const encryptPayload = (payload: object, key: string): string => {
  const iv = crypto.randomBytes(16); // Generate random initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('hex') + encrypted;
};

export const generateAuthToken = (userId: string): string => {
    // Encrypt the payload before signing
    // Include encryption information in the header
    // const header = { alg: 'HS256', enc: 'A256CBC' }; // HS256 for signing, A256CBC for encryption
  
    const token = jwt.sign( {data:userId} , process.env.SECRET as string );
    return token;
  };
 export function  verifyJwt(token:string){
  const decoded = jwt.verify(token, process.env.SECRET as string) as unknown as {data:string,iat:string};
  return decoded
 }
export const setAuthTokenCookie = (res: Response, token: string) => {
    res.setHeader('Set-Cookie', `auth=${token}; HttpOnly; SameSite=Lax`);
  };
// export const decryptPayload = (encryptedPayload: string, key: string): object | null => {
//     try {
//       // Extract initialization vector (IV)
//       const iv = encryptedPayload.slice(0, 32);
//       const encrypted = encryptedPayload.slice(32);
  
//       // Decrypt the payload
//       const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
//       let decrypted = decipher.update(encrypted, 'base64', 'utf8');
//       decrypted += decipher.final('utf8');
  
//       // Parse the decrypted JSON string
//       return JSON.parse(decrypted);
//     } catch (error) {
//       console.error('Error decrypting payload:', error);
//       return null; // Indicate decryption failure
//     }
//   };