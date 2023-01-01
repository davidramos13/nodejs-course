import { HydratedDocument } from "mongoose";
import { IUser, IUserMethods } from "../../models/User";

// to make the file a module and avoid the TypeScript error
export {}

declare module 'express-session' {
  interface SessionData {
    user?: HydratedDocument<IUser, IUserMethods>;
    isLoggedIn?: boolean;
  }
}
