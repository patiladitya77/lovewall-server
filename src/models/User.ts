import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLenght: 40,
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["regular", "premium", "pro"],
    },
    photoURL: {
      type: String,
    },
    totalVideos: {
      type: Number,
    },
    totalSpaces: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
