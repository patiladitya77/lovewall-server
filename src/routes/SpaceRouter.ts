import express from "express";
import {
  createSpaceController,
  getSpacesController,
} from "../controllers/SpaceController";
import { userAuth } from "../middlewares/userAuth";

const SpaceRouter = express.Router();

SpaceRouter.get("/getallspaces", userAuth, getSpacesController);
SpaceRouter.post("/createspace", userAuth, createSpaceController);
export default SpaceRouter;
