import { Document, Types } from "mongoose";

export interface IAffiliateStat {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  affiliateSales: Types.ObjectId[];
}
