import express from "express";
import mongoose from "mongoose";
const app = express();
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRouter from "../routes/authentication";

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((err) => {
    console.error(err);
  });
