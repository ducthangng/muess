import { Router } from 'express';
import UsersController from '@/controllers/users.controller';
import { CreateUserDto } from '@/dtos/users.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import LicenseController from '@/controllers/license.controller';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();
  public licenseController = new LicenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}`, this.usersController.getUserById);
    this.router.get(
      `${this.path}/roposedLicense`,
      this.licenseController.getProposalsByBuyerID
    );
    this.router.get(
      `${this.path}/soldLicense`,
      this.licenseController.getProposalsBySellerID
    );
    this.router.get(
      `${this.path}/app`,
      this.licenseController.getProposalsByBuyerID
    );
    this.router.post(
      `${this.path}/createProposal`,
      this.licenseController.createLicenseProposal
    );
    this.router.post(
      `${this.path}/acceptProposal`,
      this.licenseController.acceptLicenseProposal
    );
    this.router.post(
      `${this.path}/denyProposal`,
      this.licenseController.acceptLicenseProposal
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser
    );
    this.router.put(
      `${this.path}`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser
    );
    this.router.delete(`${this.path}`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
