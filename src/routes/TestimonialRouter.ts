import express from "express";
import { userAuth } from "../middlewares/userAuth";
import { getTestimonialsController } from "../controllers/TestimonialController";
const TestimonialRouter = express.Router();
TestimonialRouter.get(
  "/gettestimonials/:spaceId",
  userAuth,
  getTestimonialsController
);

export default TestimonialRouter;
