import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp
    );
    this.router.get(
      `${this.path}/login`,
      // validationMiddleware(CreateUserDto, 'body'),
      this.authController.login
    );
    // this.router.post(
    //   `${this.path}getRegisteredClient`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.authController.getRegisteredClient
    // );
    // this.router.post(
    //   `${this.path}createChannel`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.authController.createChannel
    // );
    // this.router.post(
    //   `${this.path}joinChannel`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.authController.joinChannel
    // );
    // this.router.post(
    //   `${this.path}login`,
    //   validationMiddleware(CreateUserDto, 'body'),
    //   this.authController.logIn
    // );
    // this.router.post(
    //   `${this.path}logout`,
    //   authMiddleware,
    //   this.authController.logOut
    // );
  }
}

export default AuthRoute;
