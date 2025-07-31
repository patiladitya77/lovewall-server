import { getAuth, clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

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

    (req as any).user = user;

    next();
  } catch (err) {
    console.error("User Auth Middleware Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
