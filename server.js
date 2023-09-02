import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cors from 'cors';
import cartRoute from "./routes/cartRoute.js";

//configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('public'));

//routes
app.use("/api/v1",authRoute);
app.use("/api/v1",categoryRoute);
app.use("/api/v1",productRoute);
app.use("/api/v1",cartRoute)

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });

//PORT
const PORT = process.env.PORT || 8080;


//run listen
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
    });


