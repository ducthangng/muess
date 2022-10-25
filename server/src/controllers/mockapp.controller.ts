import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { App } from '@interfaces/apps.interface';
//import appService from '@services/apps.service';

const x: App = {
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

const createlicenseApp: App = {
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

class AppController {
  //public appService = new appService();

  public getApps = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const findAllAppsData: App[] = await this.appService.findAllApp();

      //return
      res.status(200).json({ data: x, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAppById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appId: string = req.params.id;
      //const findOneAppData: App = await this.appService.findAppById(appId);

      //return
      res.status(200).json({ data: x, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //const appData: CreateUserDto = req.body;
      //const createAppData: App = await this.appService.createApp(appData);

      res.status(201).json({ data: x, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

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
        .json({ data: createlicenseApp, message: 'created License' });
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
      res.status(201).json({ data: x, message: 'got license' });
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
      res.status(201).json({ data: x, message: 'findLicense' });
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
      res.status(201).json({ data: x, message: 'purchased License' });
    } catch (error) {
      next(error);
    }
  };
}
