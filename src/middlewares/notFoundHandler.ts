/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomError } from '../helpers/customError';

export const notFoundHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  throw new CustomError(404);
};
