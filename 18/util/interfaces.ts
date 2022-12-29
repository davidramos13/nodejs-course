import { Types } from "mongoose";

export interface DocumentResult<T> {
  _id: Types.ObjectId;
  _doc: T;
}
