import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import User from "../models/User";
import Space from "../models/Space";
import { nanoid } from "nanoid";

export const getSpacesController = async (req: Request, res: Response) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No userId in token." });
    }

    const clerkUser = await clerkClient.users.getUser(auth.userId);
    const email = clerkUser?.emailAddresses[0]?.emailAddress;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const spaces = await Space.find({ ownerId: user._id });

    res.json({
      message: "Authenticated",
      spaces,
    });
  } catch (err: any) {
    console.error("Internal Server Error:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

export const createSpaceController = async (req: Request, res: Response) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(400).json({ message: "Unauthorised" });
    }
    const clerkUser = await clerkClient.users.getUser(auth.userId);
    const {
      spaceName,
      spaceLogo,
      headerTitle,
      customMessage,
      questions,
      thankyouTitle,
      thankyouMessage,
    } = req.body;
    const user = await User.findOne({
      email: clerkUser?.emailAddresses[0]?.emailAddress,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const slug = nanoid(5);
    const space = new Space({
      spaceName: spaceName,
      spaceLogo: spaceLogo,
      headerTitle: headerTitle,
      customMessage: customMessage,
      questions: questions,
      thankyouMessage: thankyouMessage,
      thankyouTitle: thankyouTitle,
      ownerId: user._id,
      slug: slug,
    });
    const savedSpace = await space.save();
    res.json({ message: "Space cretaed successfully", savedSpace });
  } catch (err) {
    res.status(400).json({ message: "ERROR " + err });
  }
};
