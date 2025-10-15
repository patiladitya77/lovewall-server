import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import Space from "../models/Space";
import Testimonial from "../models/Testimonial";
import User from "../models/User";

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
    const { spaceId } = req.params;
    const isSpaceExist = await Space.findById({ _id: spaceId });
    if (!isSpaceExist) {
      return res.json({ message: "Space does not exits" });
    }
    const { ownerId } = isSpaceExist;
    const user = await User.findById({ _id: ownerId });
    if (!user) {
      return res.status(400).json({ message: "Owner does not exists" });
    }

    const { videoUrl, name, email, starRating, type } = req.body;
    const test = new Testimonial({
      name: name,
      spaceId: spaceId,
      starRating: starRating,
      feedbackType: type,
      senderEmail: email,
      videoUrl: videoUrl,
    });
    const savedTest = await test.save();
    user.totalVideos++;
    await user?.save();
    res.json({ message: "testimonail saved successfully", savedTest });
  } catch (error) {
    return res.status(400).json({ message: "error", error });
  }
};

export const deleteTestimonialController = async (
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
    const { testimonialId } = req.params;
    const testimnonail = await Testimonial.findById(testimonialId);
    if (!testimnonail) {
      return res.status(400).json({ message: "Testimonial not found" });
    }
    await Testimonial.findByIdAndDelete(testimonialId);
    res.json({ message: "Testimnonial deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "ERROR: ", error });
  }
};

export const likeTestimonialController = async (
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

    // If it's bulk, req.body.updates = [{ id, isLiked }]
    const { updates, id, isLiked } = req.body;

    //  Bulk update
    if (updates && Array.isArray(updates)) {
      const results = [];
      for (const u of updates) {
        const testimonial = await Testimonial.findById(u.id);
        if (testimonial) {
          testimonial.isLiked = u.isLiked;
          await testimonial.save();
          results.push({ id: u.id, isLiked: testimonial.isLiked });
        }
      }
      return res.json({ message: "Bulk like status updated", results });
    }

    // Single update
    if (id) {
      const testimonial = await Testimonial.findById(id);
      if (!testimonial) {
        return res.status(400).json({ message: "Testimonial not found" });
      }
      testimonial.isLiked =
        typeof isLiked === "boolean" ? isLiked : !testimonial.isLiked;
      await testimonial.save();
      return res.json({
        message: "Testimonial like status updated",
        testimonial,
      });
    }

    return res.status(400).json({ message: "No valid data provided" });
  } catch (err) {
    res.status(400).json({ message: "error: " + err });
  }
};
