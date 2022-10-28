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
    this.router.post(
      `${this.path}/createProposal`,
      this.hlfController.createProposal
    );
    this.router.post(
      `${this.path}/acceptProposal`,
      this.hlfController.acceptProposal
    );
    this.router.get(
      `${this.path}/proposals-by-app/:appId`,
      this.hlfController.getProposalsByAppID
    );
    this.router.get(
      `${this.path}/proposals-by-buyer/:buyerId`,
      this.hlfController.getProposalsByBuyerID
    );
  }
}

export default HLFRoute;
