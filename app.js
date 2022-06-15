const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/todo", router);

const start = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connect to database successfully");
      app.listen("5000", () => {
        console.log("localhost:5000");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

start();
