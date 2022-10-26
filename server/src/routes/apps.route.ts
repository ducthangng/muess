import { Router } from 'express';
import AppsController from '@controllers/apps.controller';
import { CreateAppDto } from '@dtos/apps.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AppsRoute implements Routes {
  public path = '/apps';
  public router = Router();
  public appsController = new AppsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.appsController.getAllApps);
    this.router.get(`${this.path}/:id`, this.appsController.getAppById);
    this.router.post(
      `${this.path}`,
      // validationMiddleware(CreateAppDto, 'body'),
      this.appsController.createApp
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateAppDto, 'body', true),
      this.appsController.updateApp
    );
    // this.router.delete(`${this.path}/:id`, this.appsController.deleteApp);
  }
}

export default AppsRoute;
