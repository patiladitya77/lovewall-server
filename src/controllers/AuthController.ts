import { Request, Response } from "express";
import User from "../models/User";
import Space from "../models/Space";

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
      // console.log(savedUser);
      const spaces = await Space.find({ ownerId: savedUser[0]._id });
      res.json({ message: "User is present", savedUser, spaces });
    }
  } catch (err) {
    res.status(400).json({ message: "ERROR" + err });
  }
};
