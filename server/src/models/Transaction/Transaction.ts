import mongoose from "mongoose";
import { ITransaction } from "./entities.js";

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export default Transaction;
