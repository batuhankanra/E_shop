import mongoose from "mongoose";



interface IUSER extends mongoose.Document{
    _id:mongoose.Types.ObjectId
    name:string,
    email:string,
    password:string
    role:mongoose.Types.ObjectId
}
interface IROLE extends mongoose.Document{
  name:string,
  permissions :[string]
}
interface IPRODUCT extends mongoose.Document{
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  is_active:boolean;
  category: mongoose.Types.ObjectId;
}
interface ICATEGORIES extends mongoose.Document{
  name: string;
  slug: string;
  is_active:boolean;
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
interface findProps{
  id?:string
  name?:string
}
interface categoriesUpdatesProps{
  name?:string
  is_active?:boolean
  slug?:string
  id?:string
}
interface ProductProps{
  id?:string
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: string[];
  is_active?:boolean;
  category?: string;
}
type USerPRops=Partial<IUSER | undefined>