import mongoose from "mongoose";
import { IAffiliateStat } from "./entities.js";

const AffiliateStatSchema = new mongoose.Schema<IAffiliateStat>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model<IAffiliateStat>(
  "AffiliateStat",
  AffiliateStatSchema
);

export default AffiliateStat;
