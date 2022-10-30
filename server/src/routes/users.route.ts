import { Router } from 'express';
import UsersController from '@/controllers/users.controller';
import { CreateUserDto } from '@/dtos/users.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import AppsController from '@/controllers/mockapp.controller';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();
  public appsController = new AppsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser
    );
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

    //mock app
    // this.router.get(`${this.path}/mockapp`, this.appsController);
    // this.router.get(`${this.path}/mockapp/:id`, this.appsController.getAppById);
    // this.router.post(
    //   `${this.path}/mockapp`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.appsController.createApp
    // );
    this.router.post(
      `${this.path}/mockapp/:id`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.appsController.createAppLicense
    );
    this.router.get(
      `${this.path}/mockapp/:id/`,
      this.appsController.getAppLicenseprice
    );
    this.router.get(
      `${this.path}/mockapp/:id/`,
      this.appsController.getallAppLicense
    );
    this.router.post(
      `${this.path}/mockapp/:id/`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.appsController.purchaseLicense
    );
  }
}

export default UsersRoute;
