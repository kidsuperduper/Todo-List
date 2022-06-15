const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 255 },
});

module.exports = mongoose.model("Todo", todoSchema);
