import mongoose from "mongoose";

interface ICART extends mongoose.Document{
  user: mongoose.Types.ObjectId;
  items:cartItemProps[];
}
interface CartProps {
  user?: mongoose.Types.ObjectId;
  items?: cartItemProps[];
}

interface cartItemProps{
    product:mongoose.Types.ObjectId
    quantity:number
}