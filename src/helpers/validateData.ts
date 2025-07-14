import { validate } from 'class-validator';
import { CustomError } from './customError';

export async function validateData(data: object): Promise<void> {
  if (!Object.keys(data).length) throw new CustomError(400);

  const validationErrors = await validate(data, {
    whitelist: true,
    forbidNonWhitelisted: true
  });

  for (const error of validationErrors) {
    if (error.constraints) {
      const constraintMessages = Object.values(error.constraints);
      if (constraintMessages.length) {
        const message = constraintMessages[0];
        throw new CustomError(400, message);
      }
    }
  }
}
