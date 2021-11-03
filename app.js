const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/not-foubt.js");
const errorHandler = require("./middleware/error-handler");

//middleware

app.use(express.json());
app.use(express.static("./public"));

//routes

app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
