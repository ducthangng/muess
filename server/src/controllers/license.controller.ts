import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/proposal.service';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto,
  RejectProposalDto
} from '@/dtos/hlf.dto';
import { User } from '@/interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import ProposalService from '../services/proposal.service';

class ProposalController {
  public proposalService = new ProposalService();

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
        await this.proposalService.getProposalsByBuyerId(user, buyerId);

      res.status(200).json({ data: proposalsData, message: 'Found' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Loc Bui
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

export default ProposalController;
