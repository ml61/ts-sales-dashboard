import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import {
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from "./data/index.js";
import User from "./models/User/User.js";
import Product from "./models/Product/Product.js";
import ProductStat from "./models/ProductStat/ProductStat.js";
import Transaction from "./models/Transaction/Transaction.js";
import OverallStat from "./models/OverallStat/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat/AffiliateStat.js";

//Configurations
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL || "", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server port - ", PORT));

    // Only add data one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((err) => console.log(`${err}. Unable to connect :(`));
