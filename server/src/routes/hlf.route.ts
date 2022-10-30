import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import HLFController from '../controllers/hlf.controller';

console.log('inside hlf route');

class HLFRoute implements Routes {
  public path = '/hlf';
  public router = Router();
  public hlfController = new HLFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create-app`, this.hlfController.createApp);
    this.router.post(
      `${this.path}/create-proposal`,
      this.hlfController.createProposal
    );
    this.router.post(
      `${this.path}/accept-proposal`,
      this.hlfController.acceptProposal
    );
    this.router.get(
      `${this.path}/apps-by-creator/:creatorId`,
      this.hlfController.getAppsByCreatorId
    );
    this.router.get(
      `${this.path}/proposals-by-app/:appId`,
      this.hlfController.getProposalsByAppId
    );
    this.router.get(
      `${this.path}/proposals-by-buyer/:buyerId`,
      this.hlfController.getProposalsByBuyerId
    );
  }
}

export default HLFRoute;
