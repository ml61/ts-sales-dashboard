import mongoose from "mongoose";
import { IProduct } from "./entities.js";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
