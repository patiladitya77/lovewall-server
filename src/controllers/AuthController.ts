import { Request, Response } from "express";
import User from "../models/User";

export const saveUserController = async (req: Request, res: Response) => {
  try {
    const { email, photoURL, name } = req.body;
    const isUserPresent = await User.find({ email });
    if (!isUserPresent) {
      const user = new User({ name: name, email: email, photoURL: photoURL });
      const savedUser = await user.save();
      res.json({ message: "User saved successfully", savedUser });
    } else {
      const savedUser = isUserPresent;
      res.json({ message: "User is present", savedUser });
    }
  } catch (err) {
    res.status(400).json({ message: "ERROR" + err });
  }
};
