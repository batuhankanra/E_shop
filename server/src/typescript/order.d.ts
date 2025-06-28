import mongoose from "mongoose";



interface IORDER extends mongoose.Document{
  user: mongoose.Types.ObjectId;
  items:ItemProps[],
  totalAmount:number
  status:  'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
}

interface ItemProps{
    product:mongoose.Types.ObjectId
    quantity:number
    price:number
}
interface ORderUpdates{
   user?: string;
  items?: {
    product: string;
    quantity: number;
    price: number;
  }[];
  status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount?: number;
}
