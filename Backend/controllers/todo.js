import Todos from "../models/ToDo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({ author: req.user._id }); 
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
    status: req.body.status
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
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { $set: 
        { 
            author: req.user._id,
            status: req.body.itemCopy.status,
            description: req.body.itemCopy.description,
            priority: req.body.itemCopy.priority,
            dueDate: req.body.itemCopy.dueDate,
            repetition: req.body.itemCopy.repetition 
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
