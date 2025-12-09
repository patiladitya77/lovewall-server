import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  createWallController,
  getAllWallsController,
  updateWallController,
} from "../controllers/Wallcontroller";
const wallRouter = express.Router();
wallRouter.post("/createwall", userAuth, createWallController);
wallRouter.get("/getallwalls", userAuth, getAllWallsController);
wallRouter.patch("/updatewall/:wallid", userAuth, updateWallController);
export default wallRouter;
