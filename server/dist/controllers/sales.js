import OverallStat from "../models/OverallStat/OverallStat.js";
export const getSales = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats[0]);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
//# sourceMappingURL=sales.js.map