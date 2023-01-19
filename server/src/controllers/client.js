import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const timeStart = new Date();

    // this query is really slow
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.findOne({
          productId: product._id,
        });
        return { ...product._doc, stat };
      })
    );
    const timeEnd = new Date();
    console.log(
      `${
        timeEnd - timeStart
      }ms to receive all stats and add stat to each product`
    );

    // second approach, better. Check it with in action with timestamps in the beginning and at the end of the query:
    // https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in
    // const timeStart=new Date()
    // const productIds = products.map((product) => product._id);
    // const stats = ProductStat.find({ quantity: { $in: productIds } });
    // const productsWithStats = products.map((product) => ({
    //   ...product,
    //   stat: stats.find((stat) => stat.productId === product._id),
    // }));
    // const timeEnd=new Date();
    // console.log(`${timeEnd-timeStart}ms to receive all stats and add stat to each product`);

    res.status(200).json(productsWithStats);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const getTransactions = async (req, res) => {
  try {
    // sort = {"field":"userId", "sort":"desc"}

    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = (sort) => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "desc" ? -1 : 1,
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort(sort) : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      return {
        ...acc,
        [countryISO3]: acc[countryISO3] ? acc[countryISO3] + 1 : 1,
      };
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );

    res.status(200).json(formattedLocations);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
