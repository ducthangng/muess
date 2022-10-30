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
      const result: any = await this.appService.createApp(user, appData);

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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllAppsData: App[] = await this.appService.getAllApss();

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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.id;
      const findOneAppData: App[] = await this.appService.getAppById(appId);

      res.status(200).json({ data: findOneAppData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Khang Nguyen
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
      const appsData: any = await this.appService.getAppsByCreatorId(
        user,
        creatorId
      );

      res.status(200).json({ data: appsData, message: 'Found' });
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
      const updateAppData: App = await this.appService.updateApp(appData);

      res.status(200).json({ data: updateAppData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deactivate the license generating feature fot this application
   * @param req
   * @param res
   * @param next
   */
  public deleteApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const appId: string = req.params.id;
      const deleteAppData: App = await this.appService.deleteApp(appId);

      res.status(200).json({ data: deleteAppData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AppsController;
