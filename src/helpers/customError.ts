import { ErrorStatusCodeEnum } from '../enums/errorStatusCodeEnum';
import { ErrorMessageEnum } from '../enums/errorMessageEnum';

export class CustomError extends Error {
  constructor(
    public readonly statusCode: ErrorStatusCodeEnum = ErrorStatusCodeEnum.Default,
    public readonly message: string = ErrorMessageEnum[
      ErrorStatusCodeEnum[statusCode] as keyof typeof ErrorMessageEnum
    ]
  ) {
    super(message);
  }
}
