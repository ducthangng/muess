import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';
import { License } from '@/interfaces/hlf.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import LicenseService from '../services/license.service';
import UserService from '../services/users.service';

class LicenseController {
  public licenseService = new LicenseService();
  public userService = new UserService();

  /**
   * @param req
   * @param res
   * @param next
   */
  public getLicenseByOwnerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqUser: User = req.user;
      const buyerId: string = req.params.buyerId;

      const user: User = await this.userService.findUserById(reqUser._id);
      if (user._id.length === 0) {
        throw new Error('User not found');
      }

      const licenseData: string = await this.licenseService.getLicenseByOwnerId(
        user,
        buyerId
      );

      res.status(200).json({ data: licenseData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseByCreatorId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqUser: User = req.user;
      const creatorId: string = req.params.creatorId;

      const user: User = await this.userService.findUserById(reqUser._id);
      if (user._id.length === 0) {
        throw new Error('User not found');
      }

      const licenseData: string =
        await this.licenseService.getLicenseByCreatorId(user, creatorId);

      res.status(200).json({ data: licenseData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  public getLicenseByAppId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqUser: User = req.user;
      const appId: string = req.params.appId;

      const user: User = await this.userService.findUserById(reqUser._id);
      if (user._id.length === 0) {
        throw new Error('User not found');
      }

      const licenseData: string = await this.licenseService.getLicenseByAppId(
        user,
        appId
      );

      res.status(200).json({ data: licenseData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };
}

export default LicenseController;
