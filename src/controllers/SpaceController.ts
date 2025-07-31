import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import User from "../models/User";
import Space from "../models/Space";

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
