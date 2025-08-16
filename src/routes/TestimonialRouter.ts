import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  getTestimonialsController,
  sendTextTestimnonialController,
  sendVideoTestimonialController,
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
TestimonialRouter.post(
  "/sendvideotestimonial/:spaceId",
  userAuth,
  sendVideoTestimonialController
);

export default TestimonialRouter;
