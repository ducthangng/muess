import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { App } from '@interfaces/apps.interface';
//import appService from '@services/apps.service';
import { APISmartContract } from '../dtos/smartContract.dto';

const app: App = {
  _id: '1',
  title: '1',
  description: '1',
  rated: '1',
  reviewer: '1',
  appTag: '1',
  downloaded: 1,
  appInformations: '1',
  feedbacks: [
    {
      name: '1',
      content: '1'
    }
  ]
};

const smartContractMockData: APISmartContract = {
  productId: '1',
  provider: 'Thang',
  price: 1.76,
  purchaseDate: new Date('2023-10-10'),
  smartContractInfo: '1'
};

class AppsController {
  //public appService = new appService();

  public createlicenseApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appId: string = req.params.id;
      //const appLicense: CreateUserDto = req.body;
      //const createAppLicense: App = await this.appService.createlicenseApp(appId, appLicense)

      //return
      res
        .status(201)
        .json({ data: smartContractMockData, message: 'created License' });
    } catch (error) {
      next(error);
    }
  };

  public getAllDeveloperSmartContract = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appId: string = req.params.id;
      //const appLicense: CreateUserDto = req.body;
      //const createAppLicense: App = await this.appService.createlicenseApp(appId, appLicense)

      //return
      res
        .status(201)
        .json({ data: smartContractMockData, message: 'created License' });
    } catch (error) {
      next(error);
    }
  };

  public getAppLicenseprice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appId: string = req.params.id;
      //const Licenseprice: string = req.params.price;
      //const getAppLicenseprice: App = await this.appService.getAppLicenseprice(appId, Licenseprice)

      //return
      res
        .status(201)
        .json({ data: smartContractMockData, message: 'got license' });
    } catch (error) {
      next(error);
    }
  };

  public getallAppLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const getallAppLicense: App = await this.appService.findAllLicense()

      //return
      res
        .status(201)
        .json({ data: smartContractMockData, message: 'findLicense' });
    } catch (error) {
      next(error);
    }
  };

  public purchaseLicense = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appId: string = req.params.id;
      //const purchaseLicense: string = req.body;
      //const getpurchaseLicense: App = await this.appService.purchaseLicense(appId, purchaseLicense)

      //return
      res
        .status(201)
        .json({ data: smartContractMockData, message: 'purchased License' });
    } catch (error) {
      next(error);
    }
  };
}

export default AppsController;
