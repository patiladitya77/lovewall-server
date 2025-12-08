import mongoose from "mongoose";

const wallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    wallType: {
      type: String,
      enum: ["mansory-animated", "mansory-fixed", "carousel-slider"],
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
