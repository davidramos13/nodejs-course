import { Request } from 'express';
import { Types } from 'mongoose';

export interface DocumentResult<T> {
  _id: Types.ObjectId;
  _doc: T;
}

export type FileFilterFn = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: null, acceptFile: boolean) => void,
) => void;
