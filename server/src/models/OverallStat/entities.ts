import { Types } from "mongoose";

export type MonthlyData = {
  month: string;
  totalSales: number;
  totalUnits: number;
};
export type DailyData = {
  date: string;
  totalSales: number;
  totalUnits: number;
};

export interface IOverallStat {
  _id: Types.ObjectId;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  salesByCategory: Map<string, number>;
}
