import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  getTestimonialsController,
  sendTextTestimnonialController,
} from "../controllers/TestimonialController";
const TestimonialRouter = express.Router();
TestimonialRouter.get(
  "/gettestimonials/:spaceId",
  userAuth,
  getTestimonialsController
);
TestimonialRouter.post(
  "/sendtexttestimonial/:spaceId",
  userAuth,
  sendTextTestimnonialController
);

export default TestimonialRouter;
