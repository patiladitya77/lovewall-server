import express from "express";
import {
  createSpaceController,
  deleteSpaceController,
  getSpaceByIdController,
  getSpaceForUserByIdController,
  getSpacesController,
} from "../controllers/SpaceController";
import { userAuth } from "../middlewares/userAuth";

const SpaceRouter = express.Router();

SpaceRouter.get("/getallspaces", userAuth, getSpacesController);
SpaceRouter.post("/createspace", userAuth, createSpaceController);
SpaceRouter.get("/getspacebyid/:spaceId", userAuth, getSpaceByIdController);
SpaceRouter.get("/getspaceforuserbyid/:spaceId", getSpaceForUserByIdController);

SpaceRouter.delete("/deletespace/:spaceId", userAuth, deleteSpaceController);
export default SpaceRouter;
