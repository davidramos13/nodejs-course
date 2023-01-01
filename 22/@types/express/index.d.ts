import { HydratedDocument } from "mongoose";
import { IUser, IUserMethods } from "../../models/User";

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      user?: HydratedDocument<IUser, IUserMethods>;
    }
  }
}
