import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import LicenseController from '../controllers/license.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class HLFRoute implements Routes {
  public path = '/hlf';
  public router = Router();
  public licenseController = new LicenseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create-app`,
      authMiddleware,
      this.licenseController.createApp
    );
    this.router.post(
      `${this.path}/create-proposal`,
      authMiddleware,
      this.licenseController.createProposal
    );
    this.router.post(
      `${this.path}/accept-proposal`,
      authMiddleware,
      this.licenseController.acceptProposal
    );
    this.router.post(
      `${this.path}/reject-proposal`,
      authMiddleware,
      this.hlfController.rejectProposal
    );
    // remember to encodeURIComponent(creatorId) before sending to server
    this.router.get(
      `${this.path}/apps-by-creator/:creatorId`,
      authMiddleware,
      this.licenseController.getAppsByCreatorId
    );
    this.router.get(
      `${this.path}/proposals-by-app/:appId`,
      authMiddleware,
      this.licenseController.getProposalsByAppId
    );
    this.router.get(
      `${this.path}/proposals-by-buyer/:buyerId`,
      authMiddleware,
      this.licenseController.getProposalsByBuyerId
    );
  }
}

export default HLFRoute;
