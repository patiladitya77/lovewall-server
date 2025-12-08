import { Request, Response } from "express";
import Wall from "../models/Wall";

export const createWallController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { name, wallType } = req.body;
    const newWall = new Wall({
      name: name,
      wallType: wallType,
      ownerId: user._id,
    });
    const savedWall = await newWall.save();
    res.json({ message: "New Wall Created successfully", savedWall });
  } catch (err) {
    res.status(400).json({ message: "ERROR " + err });
  }
};
