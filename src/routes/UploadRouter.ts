import express from "express";
import { getUploadAuth } from "../controllers/UploadController";

const uploadRouter = express.Router();

uploadRouter.get("/upload-auth", getUploadAuth);

export default uploadRouter;
