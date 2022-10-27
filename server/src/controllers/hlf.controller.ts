import HLFService from '@/services/hlf.service';
import { NextFunction, Request, Response } from 'express';

class HLFController {
  public hlfservice = new HLFService();

  public bidLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('tes');
    try {
      // const findAllAsset = await this.hlfservice.getAllAssets();
      const x: [] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };

  public getAllBids = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('getAllBids');
    try {
      // const findAllAsset = await this.hlfservice.getAllAssets();
      const x: [] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };

  public agreeToTransfer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('tes');
    try {
      // const findAllAsset = await this.hlfservice.getAllAssets();
      const x: [] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTransferAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('tes');
    try {
      // const findAllAsset = await this.hlfservice.getAllAssets();
      const x: [] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };
}

export default HLFController;
