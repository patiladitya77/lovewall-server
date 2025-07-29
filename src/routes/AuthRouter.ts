import express from "express";
import { saveUserController } from "../controllers/AuthController";
const AuthRouter = express.Router();
AuthRouter.post("/saveuser", saveUserController);

export default AuthRouter;
