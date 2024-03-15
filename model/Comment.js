import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default:false
  },
  viewed: {
    type: Boolean,
    required: true,
    default:false
  },
  parent_id: {
    type: String,
    default:"no-parent"
  },
  post_id: {
    type: String,
    required: true,
  },
  blog_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: ""
  },
  updatedAt: {
    type: String,
    required: true,
    default: ""
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
