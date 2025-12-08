import mongoose from "mongoose";

const wallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    wallType: {
      type: String,
      enum: ["masonry-animated", "masonry-fixed", "carousel-slider"],
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
    showMore: {
      type: Boolean,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wall = mongoose.model("Wall", wallSchema);
export default Wall;
