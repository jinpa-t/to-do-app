// todo.model.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  // Index 0: status (0 = Pending, 1 = Completed, etc.)
  status: {
    type: Number,
    required: true,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  // Index 1: description
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  // Index 2: priority (0 = Low, 1 = Medium, 2 = High, etc.)
  priority: {
    type: Number,
    required: true,
    default: 0
  },
  // Index 3: due date (Handles MM-DD-YYYY or native Date strings)
  dueDate: {
    type: Date,
    required: true
  },
  // Index 4: repetition (0 = None, 1 = Daily, 2 = Weekly, etc.)
  repetition: {
    type: Number,
    required: true,
    default: 0
  },
  
}, {
  timestamps: true
});

// Helper Method: Formats a Mongoose document back into your array format
todoSchema.methods.toArrayFormat = function() {
  // Formats date back to MM-DD-YYYY for the array
  const formattedDate = this.dueDate.toISOString().split('T')[0].replace(/-/g, '/'); 
  // Custom format adjustment can be made here if you need strictly "MM-DD-YYYY"
  const mm = String(this.dueDate.getMonth() + 1).padStart(2, '0');
  const dd = String(this.dueDate.getDate()).padStart(2, '0');
  const yyyy = this.dueDate.getFullYear();
  
  return [
    this.status,
    this.description,
    this.priority,
    `${mm}-${dd}-${yyyy}`,
    this.repetition
  ];
};

export default mongoose.model('Todo', todoSchema);

