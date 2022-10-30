import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import HLFController from '../controllers/hlf.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class HLFRoute implements Routes {
  public path = '/hlf';
  public router = Router();
  public hlfController = new HLFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create-app`,
      authMiddleware,
      this.hlfController.createApp
    );
    this.router.post(
      `${this.path}/create-proposal`,
      authMiddleware,
      this.hlfController.createProposal
    );
    this.router.post(
      `${this.path}/accept-proposal`,
      authMiddleware,
      this.hlfController.acceptProposal
    );
    // remember to encodeURIComponent(creatorId) before sending to server
    this.router.get(
      `${this.path}/apps-by-creator/:creatorId`,
      authMiddleware,
      this.hlfController.getAppsByCreatorId
    );
    this.router.get(
      `${this.path}/proposals-by-app/:appId`,
      authMiddleware,
      this.hlfController.getProposalsByAppId
    );
    this.router.get(
      `${this.path}/proposals-by-buyer/:buyerId`,
      authMiddleware,
      this.hlfController.getProposalsByBuyerId
    );
  }
}

export default HLFRoute;
