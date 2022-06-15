const Todo = require("../models/Todo");

exports.addTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({ error: `Task not found with id: ${id}` });
    }
    res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOneAndRemove({ _id: id });
    if (!todo) {
      return res.status(404).json({ error: `Task not found with id: ${id}` });
    }
    res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ error: `Task not found with id: ${id}` });
    }
    res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
