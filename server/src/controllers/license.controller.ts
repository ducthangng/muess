import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';
import { License } from '@/interfaces/hlf.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import LicenseService from '../services/license.service';

class LicenseController {
  public licenseService = new LicenseService();

  /**
   * @param req
   * @param res
   * @param next
   */
  public getLicenseByBuyerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const buyerId: string = req.params.buyerId;
      const licenseData: any = await this.licenseService.getLicenseByBuyerId(
        buyerId
      );

      res.status(200).json({ data: licenseData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };
}

export default LicenseController;
