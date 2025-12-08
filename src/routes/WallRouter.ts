import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  createWallController,
  getAllWalls,
} from "../controllers/Wallcontroller";
const wallRouter = express.Router();
wallRouter.post("/createwall", userAuth, createWallController);
wallRouter.get("/getallwalls", userAuth, getAllWalls);
export default wallRouter;
