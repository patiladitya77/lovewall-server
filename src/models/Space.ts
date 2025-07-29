import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema(
  {
    spaceName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    spaceLogo: {
      type: String,
    },
    headerTitle: {
      type: String,
      required: true,
    },
    customMessage: {
      tyoe: String,
    },
    questions: {
      type: [String],
      required: true,
    },
    thankyouTitle: {
      type: String,
      required: true,
    },
    thankyouMessage: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requierd: true,
    },
  },
  { timestamps: true }
);

const Space = mongoose.model("Space", spaceSchema);
export default Space;
