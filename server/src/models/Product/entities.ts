import { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
}
