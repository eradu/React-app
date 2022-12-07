//import mongoose to create new Schema
const mongoose = require("mongoose");

//create Schema for the user
const TodosSchema = new mongoose.Schema({
  userId: String,
  listItems: [
    {
      title: String,
      id: String,
      key: Number,
      completed: Boolean,
      editInput: Boolean,
    },
  ],
});

// export this Schema
module.exports = mongoose.model("Todos", TodosSchema);
