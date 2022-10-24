import HLFService from '@/services/hlf.service';
import { NextFunction, Request, Response } from 'express';
import { SampleAsset } from '@/models/hlf.model';
import {
  connect,
  Contract,
  Identity,
  Signer,
  signers
} from '@hyperledger/fabric-gateway';

class HLFController {
  public hlfservice = new HLFService();

  public getAllAssets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('tes');
    try {
      // const findAllAsset = await this.hlfservice.getAllAssets();
      const x: SampleAsset[] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };
}

export default HLFController;
