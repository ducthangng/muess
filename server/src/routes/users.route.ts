import { Router } from 'express';
import UsersController from '@/controllers/users.controller';
import { CreateUserDto } from '@/dtos/users.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import LicenseController from '@/controllers/proposal.controller';
import authMiddleware from '../middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();
  public licenseController = new LicenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.usersController.getUsers
    );
    this.router.get(
      `${this.path}/current`,
      authMiddleware,
      this.usersController.getCurrentUser
    );
    this.router.get(
      `${this.path}/:userId`,
      authMiddleware,
      this.usersController.getUserById
    );
    this.router.get(
      `${this.path}/roposedLicense`,
      authMiddleware,
      this.licenseController.getProposalsByAppId
    );
    this.router.get(
      `${this.path}/soldLicense`,
      authMiddleware,
      this.licenseController.getProposalsBySellerId
    );
    this.router.get(
      `${this.path}/app`,
      authMiddleware,
      this.licenseController.getProposalsByBuyerId
    );
    this.router.post(
      `${this.path}/createProposal`,
      authMiddleware,
      this.licenseController.createProposal
    );
    this.router.post(
      `${this.path}/acceptProposal`,
      authMiddleware,
      this.licenseController.acceptProposal
    );
    this.router.put(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser
    );
    this.router.delete(`${this.path}`, this.usersController.deleteUser);
    this.router.get(
      `${this.path}/wallet`,
      authMiddleware,
      this.usersController.getWallet
    );
  }
}

export default UsersRoute;
