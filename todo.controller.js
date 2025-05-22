const Todo = require('../models/Todo');

exports.getSummary = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  const summary = {
    total: todos.length,
    completed: todos.filter(t => t.status === 'completed').length,
    pending: todos.filter(t => t.status === 'pending').length,
    overdue: todos.filter(t => new Date(t.dueDate) < new Date() && t.status === 'pending').length
  };
  res.json(summary);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId }).sort('-createdAt');
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.user.userId });
  await todo.save();
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  res.json({ msg: 'Deleted' });
};
