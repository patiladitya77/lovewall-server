import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLenght: 40,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
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
