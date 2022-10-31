import { App } from '@interfaces/apps.interface';
import { Request, NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto,
  RejectProposalDto
} from '@/dtos/hlf.dto';
import AppService from '../services/app.service';

class AppsController {
  public appService = new AppService();

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
      const user: User = req.user;
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
      const user: User = req.user;
      const findAllAppsData: App[] = await this.appService.getAllApps(user);

      res.status(200).json({ data: findAllAppsData, message: 'findAll' });
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
      const assetId: string = req.params.assetId;
      const user: User = req.user;

      const findAllAppsData: App[] = await this.appService.getAllApps(user);
      const app: App = findAllAppsData.find((app) => {
        return app.assetId === assetId;
      });

      res.status(200).json({ data: app, message: 'findOne' });
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
      const user: User = req.user;
      const creatorId: string = req.params.creatorId;
      const findAllAppsData: App[] = await this.appService.getAppsByCreatorId(
        user,
        creatorId
      );

      res.status(200).json({ data: findAllAppsData, message: 'findOne' });
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
