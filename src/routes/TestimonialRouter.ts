import express from "express";
import { userAuth } from "../middlewares/userAuth";
import {
  deleteTestimonialController,
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

export default TestimonialRouter;
