// todo.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  color: { // Optional: useful for frontend UI styling
    type: String,
    default: '#cccccc'
  }
}, {
  timestamps: true
});

// Optional: Prevents a single user from creating duplicate categories
categorySchema.index({ name: 1, author: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;