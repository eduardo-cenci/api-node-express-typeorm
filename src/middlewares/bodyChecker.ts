import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CustomError } from '../helpers/customError';

export const bodyChecker: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requiresBody = ['POST', 'PUT'].some(method => req.method === method);

  if (requiresBody && !req.body) throw new CustomError(400);

  next();
};
