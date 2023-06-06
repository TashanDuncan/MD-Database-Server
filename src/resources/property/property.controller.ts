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

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validate.update),
      this.update
    );

    this.router.get(`${this.path}/:id`, this.retrieveOne);

    this.router.get(`${this.path}`, this.getAll);
  }

  private retrieveOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const property = await propertyService.getPropertyById(req.params.id);
      res.status(200).json(property);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const property = await propertyService.update(req.params.id, req.body);
      res.status(200).json(property);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const properties = await propertyService.getAll();

      res.status(200).json(properties);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private createNew = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createdProperty = Array.isArray(req.body)
        ? await propertyService.createMany(req.body)
        : await propertyService.create(req.body);
      res.status(201).json({ createdProperty });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
