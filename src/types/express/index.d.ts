import type { User } from "@clerk/backend";
import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
