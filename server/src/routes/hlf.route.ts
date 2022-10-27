import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HLFController from '../controllers/hlf.controller';

class HLFRoute implements Routes {
  public path = '/hlf';
  public router = Router();
  public hlfController = new HLFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.hlfController.getAllAssets);
  }
}

export default HLFRoute;
