import { Router } from 'express';
import AppsController from '@/controllers/app.controller';
import { CreateAppDto } from '@dtos/apps.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class AppsRoute implements Routes {
  public path = '/apps';
  public router = Router();
  public appsController = new AppsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateAppDto, 'body', true),
      this.appsController.updateApp
    );
    this.router.get(`${this.path}/all`, this.appsController.getAllApps);
    this.router.get(
      `${this.path}/:appId`,
      authMiddleware,
      this.appsController.getAppById
    );
    this.router.get(
      `${this.path}/creator/:creatorId`,
      authMiddleware,
      this.appsController.getAppsByCreatorId
    );
  }
}

export default AppsRoute;
