import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  deleteTestimonialController,
  getTestimonialsController,
  likeTestimonialController,
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

  sendTextTestimnonialController
);
TestimonialRouter.post(
  "/sendvideotestimonial/:spaceId",

  sendVideoTestimonialController
);
TestimonialRouter.delete(
  "/deleteTestimonial/:testimonialId",
  deleteTestimonialController
);
TestimonialRouter.post("/liketestimonial", userAuth, likeTestimonialController);

export default TestimonialRouter;
