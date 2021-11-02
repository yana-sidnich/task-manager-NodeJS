const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a value"],
    trim: true,
    maxlength: [20, "name cant be more than 20 char"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
