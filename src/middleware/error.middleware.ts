import HttpException from '@/utils/exceptions/http.exceptions';
import { Request, Response, NextFunction } from 'express';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went Wrong';

  res.status(status).send({ status, message });
}

export default errorMiddleware;
