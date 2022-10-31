import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import LicenseController from '../controllers/license.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class HLFRoute implements Routes {
  public path = '/apps';
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
      `${this.path}/ownedapps`,
      authMiddleware,
      this.licenseController.getLicenseByBuyerId
    );
  }
}

export default HLFRoute;
