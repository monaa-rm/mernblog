import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
