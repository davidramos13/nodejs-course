import { Request } from 'express';

export type FileFilterFn = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: null, acceptFile: boolean) => void,
) => void;
