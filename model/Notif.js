import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
    default: ""
  },
  user_id: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    required: true,
    default:false
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
    default: ""
  },
});

export default mongoose.models.Notif ||
  mongoose.model("Notif", notifSchema);
