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
interface IORDER extends mongoose.Document{
  user: mongoose.Types.ObjectId;
  items:{
    product:mongoose.Types.ObjectId
    quantity:number
    price:number
  }[],
  totalAmount:number
  status:'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}
interface ICART extends mongoose.Document{
  user: mongoose.Types.ObjectId;
  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
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

