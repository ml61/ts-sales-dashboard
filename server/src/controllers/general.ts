import User from "../models/User/User.js";
import OverallStat from "../models/OverallStat/OverallStat.js";
import Transaction from "../models/Transaction/Transaction.js";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // hardcoded values
    const curMonth = "November";
    const curYear = 2021;
    const curDay = "2021-11-15";

    // Recent transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // OverallStats
    const overallStats = await OverallStat.find({ year: curYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(
      ({ month }) => month === curMonth
    );
    const todayStats = overallStats[0].dailyData.find(
      ({ date }) => date === curDay
    );

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
