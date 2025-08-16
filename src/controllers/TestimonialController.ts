import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import Space from "../models/Space";
import Testimonial from "../models/Testimonial";

export const getTestimonialsController = async (
  req: Request,
  res: Response
) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No userId in token." });
    }
    const { spaceId } = req.params;
    const feedback = await Testimonial.find({ spaceId: spaceId });
    res.json({ message: "feedback fetched sucessfully", feedback });
  } catch (err) {
    res.status(400).json({ message: "error" + err });
  }
};

export const sendTextTestimnonialController = async (
  req: Request,
  res: Response
) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No userId in token." });
    }
    const { spaceId } = req.params;
    const { starRating, feedback, name, email, type } = req.body;
    const isSpaceExist = await Space.findById({ _id: spaceId });
    if (!isSpaceExist) {
      res.status(400).json({ message: "Space does not exists" });
    }
    const test = new Testimonial({
      spaceId: spaceId,
      starRating: starRating,
      feedback: feedback,
      feedbackType: type,
      name: name,
      senderEmail: email,
    });
    const savedTest = await test.save();
    res.json({ message: "testimnonail saved successfully", savedTest });
  } catch (error) {
    res.status(400).json({ message: "error" + error });
  }
};

export const sendVideoTestimonialController = async (
  req: Request,
  res: Response
) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(400).json({ message: "Unauthorised" });
    }
    const { spaceId } = req.params;
    const isSpaceExist = await Space.findById({ _id: spaceId });
    if (!isSpaceExist) {
      return res.json({ message: "Space does not exits" });
    }
    const { videoUrl, name, email, starRating, feedback, feedbackType } =
      req.body;
    const test = new Testimonial({
      name: name,
      spaceId: spaceId,
      starRating: starRating,
      feedback: feedback,
      feedbackType: feedbackType,
      senderEmail: email,
      videoUrl: videoUrl,
    });
    const savedTest = await test.save();
    res.json({ message: "testimonail saved successfully", savedTest });
  } catch (error) {}
};
