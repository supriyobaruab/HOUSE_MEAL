const express = require("express");
const mongoose = require("mongoose");
const routeHanlder = require("./handlers/routeHandler");
const env = require("dotenv").config();
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/", routeHanlder);

const database = process.env.DATABASE;
async function connectDatabase() {
  try {
    await mongoose.connect(database);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
}
const port = process.env.SERVER;
connectDatabase();
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running at " + port);
});
