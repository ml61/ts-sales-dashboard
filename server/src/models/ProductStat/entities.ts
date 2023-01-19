import { Types } from "mongoose";
import { DailyData, MonthlyData } from "../OverallStat/entities.js";

export interface IProductStat {
  _id: Types.ObjectId;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
}
