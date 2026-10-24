import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  todoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo', required: true },
  recipientEmail: { type: String, required: true },
  permission: { type: String, enum: ['view', 'edit'], required: true },
  token: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now, expires: '24h' } // Automatically auto-deletes after 24 hrs
});
export const Invitation = mongoose.model('Invitation', invitationSchema);