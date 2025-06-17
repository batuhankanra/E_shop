import mongoose from "mongoose";



interface IUSER extends mongoose.Document{
    name:string,
    email:string,
    password:string
}
interface ConfigProps{
    PORT: string;
    DB_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN:string;
}
interface JwtPayload {
  id: string;
}