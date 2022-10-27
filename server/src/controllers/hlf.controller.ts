// import HLFService from '@/services/hlf.service';
import { NextFunction, Request, Response } from 'express';

console.log('inside hlf controller');
class HLFController {
  // public hlfservice = new HLFService();

  /**
   *  Propose a transaction
   * @param req
   * @param res
   * @param next
   */
  public bidLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('tes');
    try {
      // const findAllAsset = await this.hlfservice.();
      const x: [] = [];

      res.status(200).json({ data: x, message: 'findAllAsset' });
    } catch (error) {
      next(error);
    }
  };

  /**
   *  Get All proposals
   * @param req
   * @param res
   * @param next
   */
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

  /**
   * Agree and transfer the asset
   * @param req
   * @param res
   * @param next
   */
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

  /**
   * Delete an agreement
   * @param req
   * @param res
   * @param next
   */
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

  /**
   * Get all purchased license by a user
   * @param req
   * @param res
   * @param next
   */
  public getAllUserPurchasedLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // /myApp?userId=10
      const userId = req.query['id'];

      res.status(200).json({ data: userId, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all license that a provider has sold.
   * @param req
   * @param res
   * @param next
   */
  public getAllSoldLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // /myApp?userId=10
      const userId = req.query['id'];

      res.status(200).json({ data: userId, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default HLFController;
