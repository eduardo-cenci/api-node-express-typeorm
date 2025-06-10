/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ErrorStatusCodeEnum } from '../enums/errorStatusCodeEnum';
import { ErrorMessageEnum } from '../enums/errorMessageEnum';
import { CustomError } from '../helpers/customError';

export const errorHandler: ErrorRequestHandler = (
  error: Error & Partial<CustomError>,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode ?? ErrorStatusCodeEnum.Default;
  const message = error.statusCode ? error.message : ErrorMessageEnum.Default;

  console.error(error);
  res.status(statusCode).json({ success: false, message });
};
