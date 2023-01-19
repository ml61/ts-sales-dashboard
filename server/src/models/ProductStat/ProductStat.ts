import mongoose from "mongoose";
import { IProductStat } from "./entities.js";

const ProductStatSchema = new mongoose.Schema<IProductStat>(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = mongoose.model<IProductStat>(
  "ProductStat",
  ProductStatSchema
);
export default ProductStat;
