import mongoose from "mongoose";



interface IUSER extends mongoose.Document{
    name:string,
    email:string,
    password:string
    role:mongoose.Types.ObjectId
}
interface IROLE extends mongoose.Document{
  name:string,
  permissions :[string]
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
interface UpdateRoleInput {
  name?: string;
  permissions?: string[];
}
interface findRoleProps{
  id?:string
  name?:string
}