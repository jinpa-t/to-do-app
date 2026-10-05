import Todos from "../models/ToDo.js";
import Category from "../models/Category.js";

const defaultCategory = {
  'general':'6ac414b908165769a9fd20c1',
  'work':'6ac414b908165769a9fd20c2',
  'personal':'6ac414b908165769a9fd20c3',
}

export const getTodos = async (req, res) => {
  try {
    // const todos = await Todos.find({ author: req.user._id }); 
    // res.json(todos);
    const userId = req.user._id;

    // Standard Mongoose populate handles global and custom categories automatically
    const todos = await Todos.find({ author: userId }).populate('category');

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

export const getTodo = async (req, res) => {
  try {
    const Todo = await Todos.findById({id: req.params.id, author: req.user._id});
    res.json(Todo);
  } catch (err) {
   res.status(500).json({ message: err.message || err });
  }
};

export const createTodo = async (req, res) => {
  
  const todo = new Todos({
    author: req.user._id,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    repetition: req.body.repetition,
    status: req.body.status,
    category: defaultCategory[req.body.category],
  });
  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const removedTodo = await Todos.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!removedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized to delete" });
    }

    res.json({ message: "Successfully deleted", deletedTodo: removedTodo });
    
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

export const updateTodo = async (req, res) => {
  try {
    console.log(req.body)
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { $set: 
        { 
            
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            repetition: req.body.repetition 
        } 
      },
      { new: true, runValidators: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.json({ message: err });
  }
};
