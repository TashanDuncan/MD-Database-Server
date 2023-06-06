import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import Joi from 'joi';

export default function validationMiddleware(
  schemas: Joi.Schema[]
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
    };
    try {
      const schema = Array.isArray(req.body) ? schemas[1] : schemas[0];
      const value = await schema.validateAsync(req.body, validationOptions);

      req.body = value;
      next();
    } catch (error: any) {
      const errors: string[] = [];

      error.details.forEach((e: Joi.ValidationErrorItem) => {
        errors.push(e.message);
      });

      res.status(400).json({ errors });
    }
  };
}
