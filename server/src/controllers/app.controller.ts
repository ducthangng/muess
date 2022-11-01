import { App, ChaincodeApp } from '@interfaces/apps.interface';
import { Request, NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import AppService from '../services/app.service';
import UserService from '../services/users.service';
import { CreateAppDto } from '@/dtos/hlf.dto';
import LicenseService from '@/services/license.service';
import { LicenseData } from '@/interfaces/hlf.interface';

class AppsController {
  public appService = new AppService();
  public userService = new UserService();
  public licenseService = new LicenseService();

  /**
   * Contributor: Khang Nguyen
   * @param req
   * @param res
   * @param next
   */
  public createApp = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appData: CreateAppDto = req.body;
      const reqUser: User = req.user;
      const user: User = await this.userService.findUserById(reqUser._id);

      if (user.x509Identity.length === 0) {
        throw new Error('User does not have Identity');
      }

      const result: string = await this.appService.createApp(user, appData);
      res.status(201).json({ data: result, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Siga
   * @param req
   * @param res
   * @param next
   */
  public getAllApps = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqUser: User = req.user;
      const user: User = await this.userService.findUserById(reqUser._id);

      if (user.x509Identity.length === 0) {
        throw new Error('User does not have Identity');
      }

      const result: string = await this.appService.getAllApps(user);
      const apps: ChaincodeApp[] = JSON.parse(result);

      res.status(200).json({ data: apps, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get the application details including the all the license proposal and the application details.
   * @param req
   * @param res
   * @param next
   */
  public getAppById = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.appId;
      const reqUser: User = req.user;
      const user: User = await this.userService.findUserById(reqUser._id);

      if (user.x509Identity.length === 0) {
        throw new Error('User does not have Identity');
      }

      const result: string = await this.appService.getAllApps(user);
      const apps: ChaincodeApp[] = JSON.parse(result);
      const asset: ChaincodeApp = apps.find((app) => {
        return app.Record.assetId === appId;
      });

      res.status(200).json({ data: asset, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Thang Nguyen
   * @param req
   * @param res
   * @param next
   */
  public getAppsByCreatorId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const creatorId: string = req.params.creatorId;
      const reqUser: User = req.user;
      const user: User = await this.userService.findUserById(reqUser._id);

      if (user.x509Identity.length === 0) {
        throw new Error('User does not have Identity');
      }

      console.log('creatorId: ', creatorId);
      const result: string = await this.appService.getAppsByCreatorId(
        user,
        creatorId
      );
      const asset: ChaincodeApp[] = JSON.parse(result);

      res.status(200).json({ data: asset, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Thang Nguyen
   * @param req
   * @param res
   * @param next
   */
  public getMyApp = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqUser: User = req.user;
      const user: User = await this.userService.findUserById(reqUser._id);

      if (user.x509Identity.length === 0) {
        throw new Error('User does not have Identity');
      }

      const result: string = await this.licenseService.getLicenseByOwnerId(
        user,
        reqUser._id
      );

      console.log('result: ', result);

      const allApps: string = await this.appService.getAllApps(user);

      const licenses: LicenseData[] = JSON.parse(result);

      console.log('all license: ', licenses);

      const allChainCodeApps: ChaincodeApp[] = JSON.parse(allApps);

      console.log('all apps: ', allChainCodeApps);
      const myApps = allChainCodeApps.filter((app) => {
        let check = false;
        licenses.forEach((license) => {
          if (license.Record.appId === app.Record.assetId) {
            check = true;
          }
        });

        return check;
      });

      res.status(200).json({ data: myApps, message: 'findMyApp' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update the application details
   * @param req
   * @param res
   * @param next
   */
  public updateApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appData: App = req.body;
      // const updateAppData: App = await this.appService.updateApp(appData);

      res.status(200).json({ data: appData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AppsController;
