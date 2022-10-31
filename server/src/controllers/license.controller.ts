import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import LicenseService from '../services/proposal.service';

class LicenseController {
  public licenseService = new LicenseService();

  /**
   * Contributor: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public getLicensesByBuyerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const buyerId: string = req.params.buyerId;
      const proposalsData: any =
        await this.licenseService.getProposalsByBuyerId(user, buyerId);

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @param req
   * @param res
   * @param next
   */
  public getLicenseBySellerID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const buyerId: string = req.params.buyerId;
      // const proposalsData: any = await this.hlfService.getProposalsBySellerId(
      //   buyerId
      // );

      res.status(200).json({ data: 'khang', message: 'Found' });
    } catch (error) {
      next(error);
    }
  };
}

export default LicenseController;
