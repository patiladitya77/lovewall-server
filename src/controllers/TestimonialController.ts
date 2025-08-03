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
    console.log(feedback);
    res.json({ message: "feedback fetched sucessfully", feedback });
  } catch (err) {
    res.status(400).json({ message: "error" + err });
  }
};
