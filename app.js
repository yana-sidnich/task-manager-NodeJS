const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks.js");

//middleware

app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasksRouter);

const port = 3000;

app.listen(port, () => {
  console.log("server is listening");
});
