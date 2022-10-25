import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { MockAppController } from '../controllers/mockapp.controller';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();
  public mockAppController = new MockAppController();

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

    this.router.get(
      `${this.path}/:id/smartContracts`,
      this.mockAppController.getAllDeveloperSmartContract
    );
  }
}

export default UsersRoute;
