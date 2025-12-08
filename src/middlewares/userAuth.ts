import { getAuth, clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(auth.userId);
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      return res.status(400).json({ error: "User email not found" });
    }
    const localUser = await User.findOne({ email });

    (req as any).user = localUser;

    next();
  } catch (err) {
    console.error("User Auth Middleware Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
