import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import LicenseController from '../controllers/license.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class LicenseRoute implements Routes {
  public path = '/license';
  public router = Router();
  public licenseController = new LicenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(
    //   `${this.path}/proposals-by-app/:appId`,
    //   authMiddleware,
    //   this.licenseController.getProposalsByAppId
    // );
    this.router.get(
      `${this.path}/creator/:creatorId`,
      authMiddleware,
      this.licenseController.getLicenseByCreatorId
    );

    this.router.get(
      `${this.path}/owner/:ownerId`,
      authMiddleware,
      this.licenseController.getLicenseByOwnerId
    );

    this.router.get(
      `${this.path}/app/:appId`,
      authMiddleware,
      this.licenseController.getLicenseByAppId
    );

    this.router.get(
      `${this.path}/my-app/:appId/`,
      authMiddleware,
      this.licenseController.getMyLicenseByAppId
    );
  }
}

export default LicenseRoute;
