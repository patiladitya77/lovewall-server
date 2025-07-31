import express from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./routes/AuthRouter";
import SpaceRouter from "./routes/SpaceRouter";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();
const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/space", SpaceRouter);

connectDB().then(() => {
  console.log("Connection established");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 7777");
  });
});
