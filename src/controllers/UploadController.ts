import imagekit from "../config/imagekit";
import { Request, Response } from "express";

export const getUploadAuth = (req: Request, res: Response) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json({ ...authParams, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
  } catch (error) {
    res.status(500).json({ message: "Error generating auth params", error });
  }
};
