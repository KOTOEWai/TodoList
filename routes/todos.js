const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Get all todos
router.get('/getTodoList', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Create a new todo
router.post('/addTodoList', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
        status: req.body.status,
        deadline:req.body.deadline,
    });
    await newTodo.save();
    res.json(newTodo);
});



// Delete a todo
router.delete('/deleteTodoList/:id', async (req, res) => {
    try {
      const todoId = req.params.id; // This should be the ID from the URL
      const deletedTodo = await Todo.findByIdAndDelete(todoId); // Ensure the ID is passed correctly
  
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting todo', error });
    }
  });
// Update a todo
router.post('/updateTodoList/:id', (req, res) => {
  const id = req.params.id;
  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  Todo.findByIdAndUpdate(id,updateData)
  .then((todo)=>res.json(todo))
  .catch((err)=>res.status(404).json({msg:'Todo not found'}));
});

module.exports = router;
