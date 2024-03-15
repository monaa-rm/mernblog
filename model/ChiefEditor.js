import mongoose, { Schema } from "mongoose";

const ChiefEditorchema = new mongoose.Schema({
  post_slug: {
    type: String,
    required: true,
  },
  blog_slug: {
    type: String,
    required: true,
  },
  situation: {
    type: Boolean,
    required: true,
    default: false,
  },
  number: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ChiefEditor ||
  mongoose.model("ChiefEditor", ChiefEditorchema);
