import mongoose, { Document } from "mongoose";
import { IOverallStat } from "./entities.js";

const OverallStatSchema = new mongoose.Schema<IOverallStat>(
  {
    totalCustomers: Number,
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
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model<IOverallStat>(
  "OverallStat",
  OverallStatSchema
);
export default OverallStat;
