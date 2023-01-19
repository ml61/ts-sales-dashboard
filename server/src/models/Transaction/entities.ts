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

export interface ITransaction {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  cost: string;
  products: Types.ObjectId[];
}
