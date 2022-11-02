import { App, ChaincodeApp } from '@interfaces/apps.interface';
import { Request, NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import AppService from '../services/app.service';
import UserService from '../services/users.service';
import { CreateAppDto } from '@/dtos/hlf.dto';
import LicenseService from '@/services/license.service';
import {
  ChaincodeProposal,
  LicenseData,
  Proposal
} from '@/interfaces/hlf.interface';
import proposalService from '../services/proposal.service';

class AppsController {
  public appService = new AppService();
  public userService = new UserService();
  public licenseService = new LicenseService();
  public proposalService = new proposalService();

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

      const result = await this.appService.getAllApps(user);
      const apps: App[] = result;

      Promise.all(
        apps.map(async (app) => {
          await this.userService.findUserById(app.creatorId).then((user) => {
            app.creatorName = user.fullname;
          });
          return app;
        })
      )
        .then((rr) => res.status(200).json({ data: rr, message: 'ok' }))
        .catch((err) =>
          res.status(400).json({ data: err, message: 'findAll' })
        );
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

      const result = await this.appService.getAllApps(user);
      const apps: App[] = result;
      const asset: App = apps.find((app) => {
        return app.assetId === appId;
      });

      if (asset.assetId.length === 0) {
        res.status(200).json({ data: asset, message: 'findOne' });
      }

      const proposal = await this.proposalService.getProposalsByAppId(
        user,
        appId
      );

      const users = await this.userService.findUserById(asset.creatorId);

      let sum = 0;
      let num = 0;
      proposal.forEach((p) => {
        if (p.status === 'accepted') {
          sum += parseInt(p.proposedPrice.toString());
          num++;
          console.log('sum: ', sum);
        }
      });

      // console.log('sum: ', sum);
      // console.log('num: ', num);

      const x: App = {
        assetId: asset.assetId,
        title: asset.title,
        description: asset.description,
        creatorId: asset.creatorId,
        creatorName: users.fullname,
        averageProposedPrice: Math.round(sum / num),
        proposalQuantity: proposal.length,
        assetType: asset.assetType,
        rating: asset.rating,
        appType: asset.appType,
        paymentMethod: asset.paymentMethod,
        appTags: asset.appTags,
        appCategories: asset.appCategories,
        appIconURL: asset.appIconURL
      };

      console.log('asset: ', asset.creatorName);

      res.status(200).json({ data: x, message: 'findOne' });
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
  public getAppByIdSimple = async (
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

      const result = await this.appService.getAllApps(user);
      const apps: App[] = result;
      console.log('apps', apps);
      const asset = apps.filter((app) => {
        if (app.assetId === appId) {
          return app;
        }
      });

      if (asset.length === 0) {
        res.status(200).json({ data: {}, message: 'findOne' });
      } else {
        res.status(200).json({ data: asset[0], message: 'findOne' });
      }
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
      const result = await this.appService.getAppsByCreatorId(user, creatorId);
      const asset: App[] = result;

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

      const allApps = await this.appService.getAllApps(user);
      console.log('all app: ', allApps);
      const licenses: LicenseData[] = JSON.parse(result);
      console.log('license: ', licenses);
      const allChainCodeApps: App[] = allApps;

      const myApps = allChainCodeApps.filter((app) => {
        let check = false;
        licenses.forEach((license) => {
          if (license.Record.appId === app.assetId) {
            check = true;
          }
        });

        return check;
      });

      console.log('mypp: ', myApps);

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
