const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();

//middleware

app.use(express.json());

//routes

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasksRouter);

const port = 3000;

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
