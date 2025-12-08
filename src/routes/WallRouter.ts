import express from "express";
import { userAuth } from "../middlewares/userAuth";
import { createWallController } from "../controllers/Wallcontroller";
const wallRouter = express.Router();
wallRouter.post("/createwall", userAuth, createWallController);
// wallRouter.get("/getallwalls");
export default wallRouter;
