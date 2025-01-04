const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
require('dotenv').config();
const PORT= process.env.PORT;


const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const {kitchenRouter}=require("./routes/kitchen.js")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", kitchenRouter);



connectDB()
  .then(() => {
    console.log("Database Connected...........");

    app.listen(PORT, () => {
      console.log(`Server is listening at PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed......");
  });