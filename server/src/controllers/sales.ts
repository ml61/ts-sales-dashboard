import { Request, Response } from "express";
import OverallStat from "../models/OverallStat/OverallStat.js";

export const getSales = async (req: Request, res: Response) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
