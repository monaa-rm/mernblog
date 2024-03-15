import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    default: "",
  },
  long_desc: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
    default:[]
  },
  categories: {
    type: Array,
    required: true,
    default:[]

  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
    default: "",
  },

  author_id: {
    type: String,
    required: true,
  },
  view_num: {
    type: Number,
    default: 0,
  },
  likes_num: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  manager_accept: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
