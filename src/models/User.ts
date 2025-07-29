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
      // required: true,
    },
    plan: {
      type: String,
      enum: ["Regular", "Premium", "Pro"],
      default: "Regular",
    },
    photoURL: {
      type: String,
    },
    totalVideos: {
      type: Number,
      default: 0,
    },
    totalSpaces: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
