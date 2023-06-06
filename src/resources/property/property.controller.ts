import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interfaces';
import HttpException from '@/utils/exceptions/http.exceptions';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/property/property.validation';
import * as propertyService from '@/resources/property/property.service';

class PropertyController implements Controller {
  public path = '/properties';
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.createNew
    );
  }

  private createNew = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createdProperty = await propertyService.create(req.body);
      res.status(201).json({ createdProperty });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
