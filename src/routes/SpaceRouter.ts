import express from "express";
import {
  createSpaceController,
  getSpaceByIdController,
  getSpacesController,
} from "../controllers/SpaceController";
import { userAuth } from "../middlewares/userAuth";

const SpaceRouter = express.Router();

SpaceRouter.get("/getallspaces", userAuth, getSpacesController);
SpaceRouter.post("/createspace", userAuth, createSpaceController);
SpaceRouter.get("/getspacebyid/:spaceId", getSpaceByIdController);
export default SpaceRouter;
