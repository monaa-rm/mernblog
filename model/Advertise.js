import mongoose from "mongoose";

const advertiseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  image_alt: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  viewed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Advertise ||
  mongoose.model("Advertise", advertiseSchema);
