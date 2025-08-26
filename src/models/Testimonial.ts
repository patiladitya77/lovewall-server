import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      requierd: true,
      ref: "Space",
    },
    starRating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
    },
    feedbackType: {
      type: String,
      enum: ["text", "video", "textandvideo"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    isArchived: {
      type: Boolean,
    },
    isLiked: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
