import * as bcrypt from 'bcrypt'; // Install bcrypt using npm or yarn: npm install bcrypt
import * as jwt from "jsonwebtoken"
import {Response} from "express"
import { User } from './types/userTypes';
import { config

 } from '../config';
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust the number of rounds based on your security needs
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
export const generateAuthToken = (userId: string): string => {
    const token = jwt.sign( {data:userId} , config.jwtSecret as string,{expiresIn:"1d"} );
    return token;
  };
 export function  verifyJwt(token:string){
  const decoded = jwt.verify(token, config.jwtSecret as string) as unknown as {data:string,iat:string};
  return decoded
 }
export const setAuthTokenCookie = (res: Response, token: string) => {
    res.setHeader('Set-Cookie', `auth=${token}; HttpOnly; SameSite=Lax`);
  };

export const generateUserTemplate =():User=>{
  return{
    name:"",
    username:"",
    bio:"",
    profilePicture:"",
    followers:[],
    following:[],
    posts:[],
    messageUsers:[],
    password: "",
    onboarded:false,
    privateAccount:false,
    appUsername:""

  }

}