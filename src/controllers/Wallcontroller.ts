import { Request, Response } from "express";
import Wall from "../models/Wall";

export const createWallController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { name, wallType, darkMode, showMore } = req.body;
    const newWall = new Wall({
      name: name,
      wallType: wallType,
      ownerId: user._id,
      darkMode: darkMode,
      showMore: showMore,
    });
    const savedWall = await newWall.save();
    res.json({ message: "New Wall Created successfully", savedWall });
  } catch (err) {
    res.status(400).json({ message: "ERROR " + err });
  }
};

export const getAllWallsController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const walls = await Wall.find({ ownerId: user._id });
    res.json({ message: "fetched succussfully", walls });
  } catch (err) {
    res.status(400).json({ message: "ERROR " + err });
  }
};

export const updateWallController = async (req: Request, res: Response) => {
  try {
    const { _id, name, darkMode, showMore } = req.body;

    const wall = await Wall.findById(_id);
    if (!wall) {
      return res.status(400).json({ message: "wall not found" });
    }
    if (name !== undefined) wall.name = name;
    if (darkMode !== undefined) wall.darkMode = darkMode;
    if (showMore !== undefined) wall.showMore = showMore;
    await wall.save();

    res.json({ message: "wall updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "ERROR " + error });
  }
};
