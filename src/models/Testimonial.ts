import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
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
    required: true,
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
  isArchived: {
    type: Boolean,
  },
  isLiked: {
    type: Boolean,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
